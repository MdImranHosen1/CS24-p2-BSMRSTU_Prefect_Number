import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import UpdateIcon from "@mui/icons-material/Update";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

export const MonitoringWorkingForm = ({ update = 0, employee = {} }) => {
    const [viewEmployeeModel, setViewEmployeeModel] = useState(false);
    const dispatch = useDispatch();
    const [employeeId, setEmployeeId] = useState(update ? employee?.employeeId : "");
    const [loginTime, setLoginTime] = useState(update ? employee?.loginTime : "");
    const [logoutTime, setLogoutTime] = useState(update ? employee?.logoutTime : "");
    const [totalHours, setTotalHours] = useState(update ? employee?.totalHours : "");
    const [overtimeHours, setOvertimeHours] = useState(update ? employee?.overtimeHours : "");
    const [absencesDate, setAbsencesDate] = useState(update ? employee?.absencesDate : "");
    const [leavesDate, setLeavesDate] = useState(update ? employee?.leavesDate : "");

    const toggleAddEmployeeView = () => {
        setViewEmployeeModel(!viewEmployeeModel);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const employeeData = {
            employeeId,
            loginTime,
            logoutTime,
            totalHours,
            overtimeHours,
            absencesDate,
            leavesDate
        };

        const employeeDataUp = {
            employeeId,
            loginTime,
            logoutTime,
            totalHours,
            overtimeHours,
            absencesDate,
            leavesDate
        };

        if (update === 0) {
            // dispatch(postEmployee(employeeData));
            setEmployeeId("");
            setLoginTime("");
            setLogoutTime("");
            setTotalHours("");
            setOvertimeHours("");
            setAbsencesDate("");
            setLeavesDate("");
            toggleAddEmployeeView();
            alert("Logged Working Hour added successfully");
        } else if (update === 1) {
            // dispatch(updateEmployee({ employeeId: employee._id, employeeData: employeeDataUp }));
            toggleAddEmployeeView();
            alert("Logged Working Hour updated successfully");
        }
        window.location.reload();
    };
 
    return (
        <div className="mt-5 flex flex-shrink">
            <div className="">
                {update ? (
                    <Button
                        variant="contained"
                        startIcon={<UpdateIcon />}
                        className="w-72"
                        onClick={toggleAddEmployeeView}
                    >
                        Update Logged Working Hour
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        className="w-full"
                        startIcon={<PersonAddAlt1OutlinedIcon />}
                        onClick={toggleAddEmployeeView}
                    >
                            Add Logged Working Hour
                    </Button>
                )}
            </div>

            {viewEmployeeModel && (
                <div className="z-20 fixed top-0 right-0 bottom-0 left-0 z-100 flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <div
                        style={{
                            maxHeight: "calc(100vh - 20px)",
                            overflowY: "auto",
                            width: "80%",
                            maxWidth: "800px",
                        }}
                        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {update ? "Update Logged Working Hour" : "Add Logged Working Hour"}
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                                onClick={toggleAddEmployeeView}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button
                            >
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="employeeId"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Employee ID
                                    </label>
                                    <input
                                        type="text"
                                        name="employeeId"
                                        id="employeeId"
                                        value={employeeId}
                                        onChange={(e) => setEmployeeId(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Type employee ID"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="loginTime"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Login Time
                                    </label>
                                    <input
                                        type="time"
                                        name="loginTime"
                                        id="loginTime"
                                        value={loginTime}
                                        onChange={(e) => setLoginTime(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Type login time"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="logoutTime"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Logout Time
                                    </label>
                                    <input
                                        type="time"
                                        name="logoutTime"
                                        id="logoutTime"
                                        value={logoutTime}
                                        onChange={(e) => setLogoutTime(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Type logout time"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="totalHours"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Total Hours
                                    </label>
                                    <input
                                        type="number"
                                        name="totalHours"
                                        id="totalHours"
                                        value={totalHours}
                                        onChange={(e) => setTotalHours(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Type total hours"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="overtimeHours"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Overtime Hours
                                    </label>
                                    <input
                                        type="number"
                                        name="overtimeHours"
                                        id="overtimeHours"
                                        value={overtimeHours}
                                        onChange={(e) => setOvertimeHours(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Type overtime hours"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="absencesDate"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Absences Date
                                    </label>
                                    <input
                                        type="date"
                                        name="absencesDate"
                                        id="absencesDate"
                                        value={absencesDate}
                                        onChange={(e) => setAbsencesDate(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Type absences date"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="leavesDate"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Leaves Date
                                    </label>
                                    <input
                                        type="date"
                                        name="leavesDate"
                                        id="leavesDate"
                                        value={leavesDate}
                                        onChange={(e) => setLeavesDate(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Type leaves date"
                                        required
                                    />
                                </div>
                            </div>
                            <Button variant="contained" className="w-full" type="submit">
                                {update ? "Update Logged Working Hour" : "Add new Logged Working Hour"}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
