/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import { Form, message, Tabs } from "antd";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Experience from "./Experience";
import { useDispatch } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../../apis/users.js";
import { ShowLoading, HideLoading } from "../../../redux/alertSlice.js";
import { useNavigate, useParams } from "react-router-dom";
import { updateApplicationPhoneNumber } from "../../../apis/UpdateApplicationPhoneNumber.js";
const {TabPane} = Tabs

function Profile() {

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const [userData , setUserData] = React.useState(null);
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await updateUserProfile(values);
            dispatch(HideLoading());
            if (response.success){
                message.success(response.message);
            }
              // Sync the phone number with applications
              if (values.phoneNumber) { // Check if phone number exists in the update
                await updateApplicationPhoneNumber(loggedInUser.id, values.phoneNumber); // Update phone number in applications
            }
            else {
                message.error(response.message);
            }

        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getUserProfile(params.id);
            dispatch(HideLoading());
            if (response.success) {
                console.log(response.data);
                setUserData(response.data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect(() => {
        getData();
    },[]);

    return (
        <div>
            <PageTitle title="Profile" />
            {userData && (<Form layout="vertical" onFinish={onFinish}
            initialValues={userData}
            >
            <Tabs defaultActiveKey="1">
                <TabPane tab="Personal Info" key="1">
                    <PersonalInfo />
                </TabPane>
                <TabPane tab="Education" key="2">
                    <Education />
                </TabPane>
                <TabPane tab="Experience" key="3">
                    <Experience />
                </TabPane>
            </Tabs>
            <div className="d-flex justify-content-end gap-2">
                <button className="primary-outlined-btn" type="button"
                onClick={() => navigate("/")}>Cancel</button>
                {params.id === loggedInUser.id && (
                    <button className="primary-contained-btn" type="submit">Save</button>
                )}
            </div>
            </Form>)}
        </div>
    )
}

export default Profile