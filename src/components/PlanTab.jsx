import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "@mui/material";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import useUserActions from "../actions/useUserActions";
import isAddPlanState from "../states/isAddPlanState";
import pageSelectionState from "../states/pageSelectionState";
import userPlansState from "../states/userPlansState";

function PlanTab({ label, planId, ...props }) {
  const [deleteIconDisplayState, setDeleteIconDisplayState] = useState({
    display: "none",
    zIndex: 0,
  });

  const userActions = useUserActions();

  const [plans, setPlans] = useRecoilState(userPlansState);
  const [pageSelection, setPageSelection] = useRecoilState(pageSelectionState);

  const setIsAddPlan = useSetRecoilState(isAddPlanState);

  const handleMouseOver = useCallback(() => {
    if (pageSelection.planTabIndex === props.value) {
      setDeleteIconDisplayState({ display: "block", zIndex: 1000 });
    }
  }, [setDeleteIconDisplayState, pageSelection.planTabIndex, props.value]);

  const handleMouseOut = useCallback(() => {
    setDeleteIconDisplayState({ display: "none", zIndex: 0 });
  }, [setDeleteIconDisplayState]);

  const handleDeletePlan = useCallback(async () => {
    const { value } = props;
    const plan = await userActions.deletePlan({ planId });
    setIsAddPlan(false);
    setPlans((oldPlans) => [...oldPlans].filter((p) => p.id !== planId));
  }, [userActions.deletePlan, setPlans, props.value]);
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
