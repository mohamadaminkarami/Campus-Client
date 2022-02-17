import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import PropTypes from "prop-types";

import courseGroupsListState from "../states/courseGroupsListState";
import CourseCard from "./CourseCard";
const DAYS_MAPPING = {
  0: "شنبه",
  1: "یک‌شنبه",
  2: "دوشنبه",
  3: "سه‌شنبه",
  4: "چهارشنبه",
  5: "پنج‌شنبه",
};
const DAY_KEY_NAMES = Object.entries(DAYS_MAPPING).map(([dayKey, dayName]) => [
  parseInt(dayKey),
  dayName,
]);
const HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

function Plan({ id, courseGroupIds = [], hoveredCourseGroupId }) {
  const courseGroupsList = useRecoilValue(courseGroupsListState)
    .map((item) => item.courseGroups)
    .flat();

  const courseGroupsDetail = courseGroupIds.map((cgId) =>
    courseGroupsList.find((cgd) => cgd.id === cgId)
  );

  const hoveredCourseGroupDetail = courseGroupsList.find(
    (cgd) => cgd.id === hoveredCourseGroupId
  );

  const getCardGridCount = useCallback(
    (startTime, endTime) => (endTime - startTime) / 0.5,
    []
  );

  const getGridCourseGroups = useCallback(
    (gridDate, gridHour) => {
      const c = courseGroupsDetail
        .filter(({ schedule }) =>
          schedule.find(
            ({ day, startTime }) => day === gridDate && gridHour === startTime
          )
        )
        .map((i) => ({
          ...i,
          isHovered: false,
          gridCount: getCardGridCount(
            i.schedule[0].startTime,
            i.schedule[0].endTime
          ),
        }));

      if (
        hoveredCourseGroupDetail &&
        !c.find((cg) => cg.id === hoveredCourseGroupDetail.id)
      ) {
        const { schedule } = hoveredCourseGroupDetail;
        if (
          schedule.find(
            ({ day, startTime }) => day === gridDate && gridHour === startTime
          )
        ) {
          c.push({
            ...hoveredCourseGroupDetail,
            isHovered: true,
            gridCount: getCardGridCount(
              schedule[0].startTime,
              schedule[0].endTime
            ),
          });
        }
      }

      return c;
    },
    [courseGroupsDetail, hoveredCourseGroupDetail]
  );

  return (
    <Box
      sx={{
        position: "relative",
        padding: "1px",
        margin: "0px",
        border: "1px solid white",
      }}
    >
      <Grid container textAlign="left" columns={26}>
        {/* empty Grid Item */}
        <Grid
          item
          key={`${id}:empty-day-grid`}
          xs={2}
          sx={{
            borderRight: "2px solid white",
            borderBottom: "2px solid white",
          }}
        ></Grid>

        {HOURS.map((hour, index) => (
          <>
            {/* Hour Grid Item */}
            <Grid
              item
              key={index}
              xs={1}
              sx={{
                position: "relative",
                paddingLeft: 0.5,
                backgroundImage:
                  "linear-gradient(to bottom, #333 70%, rgba(255, 255, 255, 0) 0%)",
                backgroundPosition: "right",
                backgroundSize: "1px 10px",
                backgroundRepeat: "repeat-y",
                borderLeft: hour !== "7" ? "1px solid gray" : "",
                borderBottom: "2px solid white",
              }}
            >
              {hour}
            </Grid>
            <Grid
              item
              key={`${id}-hour-${hour}:30-${index}`}
              xs={1}
              sx={{
                borderBottom: "2px solid white",
              }}
            >
              {hour + ":30"}
            </Grid>
          </>
        ))}
      </Grid>

      <Grid container textAlign="center" columns={26}>
        {DAY_KEY_NAMES.map(([dayKey, dayName], index) => (
          <>
            {/* Day Name Grid Item */}
            <Grid
              item
              key={index}
              xs={2}
              sx={{
                paddingTop: 3.9,
                paddingBottom: 3.9,
                borderRight: "2px solid white",
                borderBottom: dayKey !== 5 ? "2px solid white" : "",
              }}
            >
              {dayName}
            </Grid>
            {/* Day Hour Grid Item */}
            {HOURS.map((hour, index) => (
              <>
                <Grid
                  item
                  key={"hour:" + index}
                  xs={1}
                  sx={{
                    position: "relative",
                    borderBottom: dayKey !== 5 ? "2px solid white" : "",
                    backgroundImage:
                      "linear-gradient(to bottom, #333 70%, rgba(255, 255, 255, 0) 0%)",
                    backgroundPosition: "right",
                    backgroundSize: "1px 10px",
                    backgroundRepeat: "repeat-y",
                    borderLeft: hour !== "7" ? "1px solid gray" : "",
                  }}
                >
                  {getGridCourseGroups(dayKey, hour).map(
                    (courseGroup, index) => (
                      <CourseCard key={index} {...courseGroup} />
                    )
                  )}
                </Grid>
                {/* Day Hour+0.5 Grid Item */}
                <Grid
                  item
                  key={"hour+0.5:" + index}
                  xs={1}
                  sx={{
                    position: "absolu",
                    borderBottom: dayKey !== 5 ? "2px solid white" : "",
                  }}
                >
                  {getGridCourseGroups(dayKey, hour + 0.5).map(
                    (courseGroup, index) => (
                      <CourseCard key={index} {...courseGroup} />
                    )
                  )}
                </Grid>
              </>
            ))}
          </>
        ))}
      </Grid>
    </Box>
  );
}

Plan.propTypes = {
  id: PropTypes.number.isRequired,
  courseGroupIds: PropTypes.arrayOf(PropTypes.number),
  hoveredCourseGroupId: PropTypes.number,
};
export default Plan;
