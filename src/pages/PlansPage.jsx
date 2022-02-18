import { useTheme } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import Fuse from "fuse.js";
import { useCallback, useEffect, useMemo } from "react";
import SwipeableViews from "react-swipeable-views";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useUserActions from "../actions/useUserActions";
import AlertComponent from "../components/AlertComponent";
import CourseDetailCard from "../components/CourseDetailCard";
import Plan from "../components/Plan";
import PlanTab from "../components/PlanTab";
import courseGroupsListState from "../states/courseGroupsListState";
import isAddPlanState from "../states/isAddPlanState";
import pageSelectionState from "../states/pageSelectionState";
import PlansPageAlertState from "../states/plansPageAlertState";
import userPlansState from "../states/userPlansState";

function PlansPage() {
  const userActions = useUserActions();

  const [plans, setPlans] = useRecoilState(userPlansState);

  const [alertState, setAlertState] = useRecoilState(PlansPageAlertState);
  const handleOnCloseAlert = useCallback(() => {
    setAlertState({ open: false, message: "", severity: "error" });
  });

  useEffect(async () => {
    const { data: plans, ...plansResponse } = await userActions.getPlans();
    if (plansResponse?.error) {
      setAlertState(plansResponse.alertState);
    } else {
      setPlans(plans);
    }
  }, []);

  const [pageSelection, setPageSelection] = useRecoilState(pageSelectionState);
  const courseGroupsList = useRecoilValue(courseGroupsListState);
  const setIsAddPlan = useSetRecoilState(isAddPlanState);

  const schoolFuse = useMemo(() => {
    return new Fuse(courseGroupsList, { keys: ["schoolName"] });
  }, [courseGroupsList]);

  const getCourseGroupsListBySchoolId = useCallback(
    (schoolId) =>
      courseGroupsList.find((item) => item.schoolId === schoolId)
        ?.courseGroups || [],
    [courseGroupsList]
  );

  const courseGroupsFuse = useMemo(() => {
    return new Fuse(getCourseGroupsListBySchoolId(pageSelection.schoolId), {
      keys: ["course.name"],
    });
  }, [getCourseGroupsListBySchoolId, pageSelection.schoolId]);

  const schoolBoxfilterOptions = useCallback(
    (options, { inputValue }) => {
      return inputValue
        ? schoolFuse.search(inputValue).map((i) => i.item)
        : options;
    },
    [schoolFuse]
  );

  const courseGroupsBoxfilterOptions = useCallback(
    (options, { inputValue }) => {
      return inputValue
        ? courseGroupsFuse.search(inputValue).map((i) => i.item)
        : options;
    },
    [courseGroupsFuse]
  );

  const theme = useTheme();

  const handleChangePlanTab = useCallback(
    (event, newIndex) => {
      setPageSelection((oldPageSelection) => ({
        ...oldPageSelection,
        planTabIndex: newIndex,
        planId: plans[newIndex].id,
        hoveredCourseGroup: undefined,
      }));
    },
    [plans, setPageSelection]
  );

  const handleAddGroupCourseToPlan = useCallback(
    async ({ planId, courseGroupId }) => {
      const updatedPlan = await userActions.addCourseGroupToPlan({
        planId,
        courseGroupId,
      });
      setPlans((oldPlans) => [
        ...oldPlans.map((plan) =>
          plan.id === updatedPlan.id ? updatedPlan : plan
        ),
      ]);
    },
    [userActions, setPlans]
  );

  const handleAddPlan = useCallback(async () => {
    setIsAddPlan(true);
    const { data: plan, ...planResponse } = await userActions.createPlan();
    if (planResponse?.error) {
      setAlertState(planResponse.alertState);
    } else {
      setPlans((oldPlans) => [...oldPlans, plan]);
    }
  }, [userActions.createPlan, setPlans, plans]);

  const getCourseDetailCardProps = useCallback(() => {
    const {
      hoveredCourseGroup: {
        capacity,
        detail,
        examDate,
        groupNumber,
        professor: { name: professorName },
        course: { name: courseName, code: courseCode, credit: courseCredit },
        takeChance,
      },
    } = pageSelection;
    return {
      professorName,
      courseName,
      courseCredit,
      courseCode,
      groupNumber,
      capacity,
      examDate,
      takeChance,
      detail,
    };
  }, [pageSelection.hoveredCourseGroup]);

  return (
    <>
      <TabContext value={pageSelection.planTabIndex}>
        <TabList
          onChange={handleChangePlanTab}
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons={false}
          aria-label="plan tabs"
        >
          {plans.map((plan, index) => (
            <PlanTab
              key={index}
              planId={plan.id}
              label={`برنامه ${index + 1}`}
            />
          ))}
          <Button
            onClick={handleAddPlan}
            sx={{
              marginTop: "20px",
              padding: 0,
              minWidth: "0",
              height: "15px",
              justifyContent: "center",
            }}
          >
            <AddIcon fontSize="15px" />
          </Button>
        </TabList>
        <Grid container>
          <Grid item xs={10}>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={pageSelection.planTabIndex}
              onChangeIndex={handleChangePlanTab}
            >
              {plans.map((plan, index) => (
                <TabPanel
                  key={plan.planId}
                  value={index}
                  index={index}
                  dir={theme.direction}
                  sx={{
                    position: "relative",
                    background:
                      "linear-gradient(to right, #0c021bc4, #010a03c0)",
                    marginTop: "3px",
                    padding: "8px",
                    border: "2px solid rgba(220, 220, 170, 1)",
                  }}
                >
                  <Plan
                    key={index}
                    id={plan.planId}
                    courseGroupIds={plan.courseGroups}
                    hoveredCourseGroupId={pageSelection.hoveredCourseGroup?.id}
                  />
                </TabPanel>
              ))}
            </SwipeableViews>
          </Grid>
          <Grid item xs={2} sx={{ px: 1, position: "relative" }}>
            <Autocomplete
              getOptionLabel={(option) => option?.schoolName || option}
              disablePortal
              id="PlanSchoolBox"
              clearText="پاک کردن."
              noOptionsText="دانشکده‌ای با این نام وجود ندارد."
              options={courseGroupsList}
              filterOptions={schoolBoxfilterOptions}
              onChange={(e, value) => {
                setPageSelection((oldState) => ({
                  ...oldState,
                  schoolId: value?.schoolId,
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} variant="standard" label="دانشکده" />
              )}
            />

            <Autocomplete
              getOptionLabel={(option) => option?.course?.name || option}
              disablePortal
              disabled={!pageSelection.schoolId}
              id="PlanGroupCouresesBox"
              options={getCourseGroupsListBySchoolId(pageSelection.schoolId)}
              filterOptions={courseGroupsBoxfilterOptions}
              noOptionsText="درسی با این نام ارائه نمی‌شود."
              clearText="پاک کردن."
              onClose={(e, reason) => {
                setPageSelection((oldState) => ({
                  ...oldState,
                  hoveredCourseGroup:
                    reason !== "selectOption"
                      ? undefined
                      : oldState.hoveredCourseGroup,
                }));
              }}
              onHighlightChange={(e, selectedItem) => {
                setPageSelection((oldState) => ({
                  ...oldState,
                  hoveredCourseGroup: selectedItem,
                }));
              }}
              onChange={async (e, value, reason) => {
                setPageSelection((oldState) => ({
                  ...oldState,
                  courseGroupId: value?.id,
                  hoveredCourseGroup: undefined,
                }));

                if (reason === "selectOption") {
                  await handleAddGroupCourseToPlan({
                    planId: pageSelection.planId,
                    courseGroupId: value?.id,
                  });
                }
              }}
              ListboxProps={{ style: { maxHeight: "150px" } }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label={
                    pageSelection.schoolId
                      ? "دروس ارائه شده"
                      : "لطفا دانشکده خود را انتخاب کنید."
                  }
                />
              )}
            />

            {pageSelection.hoveredCourseGroup ? (
              <div style={{ position: "absolute", bottom: 0, width: "95%" }}>
                <CourseDetailCard {...getCourseDetailCardProps()} />
              </div>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </TabContext>
      <AlertComponent
        onClose={handleOnCloseAlert}
        open={alertState.open}
        message={alertState.message}
        severity={alertState.severity}
      />
    </>
  );
}

export default PlansPage;
