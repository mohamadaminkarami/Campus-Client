import { Button } from "@mui/material";
import Tab from "@mui/material/Tab";
import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import userPlansState from "../states/userPlansState";
import useUserActions from "../actions/useUserActions";
import selectedPlanTabIndexState from "../states/selectedPlanTabIndexState";

function PlanTab({ label, planId, ...props }) {
  const [deleteIconDisplayState, setDeleteIconDisplayState] = useState({
    display: "none",
    zIndex: 0,
  });

  const [selectedPlanTabIndex, setSelectedPlanTabIndex] = useRecoilState(
    selectedPlanTabIndexState
  );

  const [plans, setPlans] = useRecoilState(userPlansState);

  const userActions = useUserActions();

  const handleMouseOver = useCallback(() => {
    if (selectedPlanTabIndex === props.value) {
      setDeleteIconDisplayState({ display: "block", zIndex: 1000 });
    }
  }, [setDeleteIconDisplayState, selectedPlanTabIndex, props.value]);

  const handleMouseOut = useCallback(() => {
    setDeleteIconDisplayState({ display: "none", zIndex: 0 });
  }, [setDeleteIconDisplayState]);

  const handleDeletePlan = useCallback(async () => {
    const { value } = props;
    const plan = await userActions.deletePlan({ planId });

    const newIndex =
      value >= plans.length - 1
        ? plans.length - 2 >= 0
          ? plans.length - 2
          : 0
        : value;

    setSelectedPlanTabIndex(newIndex);
    setPlans((oldPlans) => [...oldPlans].filter((p) => p.id !== planId));
  }, [userActions.createPlan, setPlans, props.value, setSelectedPlanTabIndex]);
  return (
    <Tab
      onClick={(event) => {
        event.preventDefault();
      }}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
      sx={{ position: "relative" }}
      {...props}
      label={
        <>
          <Button
            onClick={handleDeletePlan}
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
            <ClearIcon
              fontSize="inherit"
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
              }}
            />
          </Button>
          {label}
        </>
      }
    />
  );
}
PlanTab.propTypes = {
  planId: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default PlanTab;
