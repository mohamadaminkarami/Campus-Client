import { useCallback, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import useUserActions from "../actions/useUserActions";
import AlertComponent from "../components/AlertComponent";
import ProfileForm from "../forms/ProfileForm";
import profilePageAlertState from "../states/profilePageAlertState";
import userProfileState from "../states/userProfileState";

function ProfilePage() {
  const setUserProfile = useSetRecoilState(userProfileState);
  const userActions = useUserActions();
  const [alertState, setAlertState] = useRecoilState(profilePageAlertState);

  useEffect(async () => {
    const result = (await userActions.getProfileInfo()).data;
    const { data: schoolList, ...schoolLisstResponse } =
      await userActions.getSchoolsList();

    if (schoolLisstResponse?.error) {
      setAlertState(schoolLisstResponse.alertState);
    } else {
      setUserProfile({
        ...result,
        takeCoursesTime: result.takeCoursesTime
          ? result.takeCoursesTime * 1000
          : Date.now(),
        school: schoolList.find((s) => s.id === result.schoolId),
        entranceYear: new Date(result.entranceYear, 6, 1),
      });
    }
  }, []);

  const handleOnCloseAlert = useCallback(() => {
    setAlertState({ open: false, message: "", severity: "error" });
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
