import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import Fuse from "fuse.js";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useCallback, useMemo, useState } from "react";
import userPlansState from "../states/userPlansState";
import Plan from "../components/Plan";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useTheme } from "@emotion/react";
import courseGroupsListState from "../states/courseGroupsListState";
import AddIcon from "@mui/icons-material/Add";
import useUserActions from "../actions/useUserActions";
import CourseDetailCard from "../components/CourseDetailCard";
import PlanTab from "../components/PlanTab";
import pageSelectionState from "../states/pageSelectionState";
import isAddPlanState from "../states/isAddPlanState";

function PlansPage() {
  const userActions = useUserActions();

  const [plans, setPlans] = useRecoilState(userPlansState);
  const [pageSelection, setPageSelection] = useRecoilState(pageSelectionState);
  const courseGroupsList = useRecoilValue(courseGroupsListState);
  const setIsAddPlan = useSetRecoilState(isAddPlanState);

  // console.log({ pageSelection, plans });

  const schoolFuse = useMemo(() => {
    console.log("plans schoolFuse called");
    return new Fuse(courseGroupsList, { keys: ["schoolName"] });
  }, [courseGroupsList]);

  const getCourseGroupsListBySchoolId = useCallback(
    (schoolId) =>
      courseGroupsList.find((item) => item.schoolId === schoolId)
        ?.courseGroups || [],
    [courseGroupsList]
  );

  const courseGroupsFuse = useMemo(() => {
    console.log("Plans courseGroupsFuse called");
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
      }));
    },
    [plans, setPageSelection]
  );

  const handleAddPlan = useCallback(async () => {
    console.log("handleAddPlan called");
    setIsAddPlan(true);
    console.log("setIsAddPlan");
    const plan = await userActions.createPlan();
    setPlans((oldPlans) => [...oldPlans, plan]);
    console.log("setPlans");
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
              onChange={async (e, value) => {
                setPageSelection((oldState) => ({
                  ...oldState,
                  courseGroupId: value?.id,
                  // hoveredCourseGroup: undefined,
                }));
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
              <div style={{ position: "absolute", bottom: 0 }}>
                <CourseDetailCard {...getCourseDetailCardProps()} />
              </div>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </TabContext>
    </>
  );
}

export default PlansPage;
