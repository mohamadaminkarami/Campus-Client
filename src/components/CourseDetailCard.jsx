import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

function Typo({ title, detail }) {
  return (
    <div>
      <Typography fontSize={15} component="span" color="text.secondary">
        {title} :
      </Typography>
      <Typography fontSize={16} component="span">
        {" "}
        {detail}
      </Typography>
    </div>
  );
}
Typo.propTypes = {
  title: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
};

function CourseDetailCard({
  professorName,
  courseName,
  courseCredit,
  courseCode,
  groupNumber,
  capacity,
  examDate,
  takeChance,
  detail,
}) {
  const getExamDateAndHour = (timeStamp) => {
    const [date, hour] = new Date(timeStamp * 1000)
      .toLocaleString("fa-IR")
      .split("،");
    return { date, hour: hour.substring(2) };
  };
  return (
    <Box sx={{ zIndex: 0, width: "100%" }}>
      <Card variant="outlined" sx={{ borderRadius: "20px" }}>
        <CardContent>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            {courseName}
          </Typography>

          <Typo title="استاد ارائه دهنده" detail={professorName} />
          <Typo title="شماره درس" detail={courseCode} />
          <Typo title="تعداد واحد درس" detail={courseCredit} />
          <Typo title="شماره گروه" detail={groupNumber} />
          <Typo title="ظرفیت گروه درسی" detail={`${capacity} نفر`} />
          <Typo
            title="تاریخ امتحان"
            detail={getExamDateAndHour(examDate).date}
          />
          <Typo title=" ساعت" detail={getExamDateAndHour(examDate).hour} />

          <Typo title="احتمال اخذ گروه توسط شما" detail={`${takeChance} %`} />
          <Typo title="توضیحات" detail={detail} />
        </CardContent>
        <CardActions>
          <Button size="small">نظرات</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

CourseDetailCard.propTypes = {
  professorName: PropTypes.string.isRequired,
  courseName: PropTypes.string.isRequired,
  courseCredit: PropTypes.number.isRequired,
  courseCode: PropTypes.number.isRequired,
  groupNumber: PropTypes.number.isRequired,
  capacity: PropTypes.number.isRequired,
  examDate: PropTypes.number.isRequired,
  takeChance: PropTypes.number.isRequired,
  detail: PropTypes.string.isRequired,
};
export default CourseDetailCard;
