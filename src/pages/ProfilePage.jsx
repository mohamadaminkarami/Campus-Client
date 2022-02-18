import { useCallback, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import useUserActions from "../actions/useUserActions";
import AlertComponent from "../components/AlertComponent";
import ProfileForm from "../forms/ProfileForm";
import profilePageAlertState from "../states/profilePageAlertStage";
import userProfileState from "../states/userProfileState";

function ProfilePage() {
  const setUserProfile = useSetRecoilState(userProfileState);
  const userActions = useUserActions();
  useEffect(async () => {
    const result = await userActions.getProfileInfo();
    const schoolList = await userActions.getSchoolsList();

    setUserProfile({
      ...result,
      takeCoursesTime: result.takeCoursesTime
        ? result.takeCoursesTime * 1000
        : Date.now(),
      school: schoolList.find((s) => s.id === result.schoolId),
      entranceYear: new Date(result.entranceYear, 6, 1),
    });
  }, []);

  const [alertState, setAlertState] = useRecoilState(profilePageAlertState);

  const handleOnCloseAlert = useCallback(() => {
    setAlertState({ open: false, message: "", severity: "" });
  });
  return (
    <>
      <ProfileForm />
      <AlertComponent
        onClose={handleOnCloseAlert}
        open={alertState.open}
        message={alertState.message}
        severity={alertState.severity}
      />
    </>
  );
}

export default ProfilePage;
