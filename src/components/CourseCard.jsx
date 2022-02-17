import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import pageSelectionState from "../states/pageSelectionState";

function CourseCard({
  course,
  professor,
  groupNumber,
  isHovered,
  gridCount,
  ...props
}) {
  const [deleteIconDisplayState, setDeleteIconDisplayState] = useState({
    display: "none",
    zIndex: 0,
  });

  const setPageSelection = useSetRecoilState(pageSelectionState);

  const handleMouseOver = () => {
    setDeleteIconDisplayState({ display: "block", zIndex: 1000 });
  };
  const handleMouseOut = () => {
    setDeleteIconDisplayState({ display: "none", zIndex: 0 });
  };

  const getPositions = useCallback((gridCount) => {
    console.log({ gridCount });
    return {
      width: `${gridCount * 100}%`,
      height: "93px",
    };
  }, []);

  const handleDeleteButtonClick = useCallback(() => {}, []);
  const handleDetailButtonClick = useCallback(() => {
    setPageSelection((oldPageSelection) => ({
      ...oldPageSelection,
      hoveredCourseGroup: { course, professor, groupNumber, ...props },
    }));
  }, []);

  return (
    <Box>
      <Card
        variant="outlined"
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        sx={{
          opacity: isHovered ? "80%" : "100%",
          zIndex: 0,
          position: "relative",
          ...getPositions(gridCount),
          padding: 0,
          border: "1px solid white",
          borderRadius: "10px",
        }}
      >
        <Button
          onClick={handleDeleteButtonClick}
          sx={{
            position: "absolute",
            top: "1px",
            left: "1px",
            height: "10px",
            width: "10px",
            minWidth: "0",
            color: "red",
            ...deleteIconDisplayState,
          }}
        >
          <DeleteIcon
            fontSize="inherit"
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
            }}
          />
        </Button>
        <CardContent
          sx={{
            textAlign: "center",
            padding: 0,
            paddingTop: "7px",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              marginTop: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "15px",
              }}
              component="div"
            >
              {course.name}
            </Typography>
            <Typography fontSize="15px" color="text.secondary">
              {professor.name}
            </Typography>
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: 0, position: "absolute", bottom: 0 }}>
          <Button
            sx={{ width: "100%" }}
            style={{ fontSize: "14px" }}
            onClick={handleDetailButtonClick}
          >
            توضیحات بیش‌تر
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
  professor: PropTypes.object.isRequired,
  groupNumber: PropTypes.number.isRequired,
  isHovered: PropTypes.bool.isRequired,
  gridCount: PropTypes.number.isRequired,
};

export default CourseCard;
