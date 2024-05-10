import { Navbar } from "./components/Navbar";
import { LoginPage } from "./pages/auth/LoginPage";
import { HomePage } from "./pages/home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsersPage } from "./pages/users/UsersPage";
import { UserDetailsPage } from "./pages/users/UserDetailsPage";
import { PasswordResetPage } from "./pages/auth/PasswordResetPage";
import { PasswordConfirmPage } from "./pages/auth/PasswordConfirmPage";
import { PasswordChangePage } from "./pages/auth/PasswordChangePage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { VehiclesAllPage } from "./pages/vehicles/VehiclesAllPage";
import { StsPage } from "./pages/sts/StsPage";
import { StsDetailsPage } from "./pages/sts/StsDetailsPage";
import { VehiclesDetailsPage } from "./pages/vehicles/VehicleDetailsPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginReload } from "./redux/slices/userHandleSlice";
import { LandfillPage } from "./pages/landﬁll/LandfillPage";
import { LandfillDetailsPage } from "./pages/landﬁll/LandfillDetailsPage";
import { PermissionsPage } from "./pages/permissions/PermissionsPage";
import { PermissionDetailsPage } from "./pages/permissions/PermissionDetailsPage";
import { RolesPage } from "./pages/roles/RolesPage";
import RolesAssignPermissionPage from "./pages/roles/RolesAssignPermissionPage";
import { RoleDetailsPage } from "./pages/roles/RoleDetailesPage";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Contractors3rdPartyPage } from "./pages/3rdPartyContractor/Contractors3rdPartyPage";
import { ContractorManagerPage } from "./pages/contractorManager/ContractorManagerPage";
import { ContractorManagerDetailsPage } from "./pages/contractorManager/ContractorManagerDetailsPage";
import { Contractors3rdPartyDetailsPage } from "./pages/3rdPartyContractor/Contractors3rdPartyDetailsPage";
import { WorkForcePage } from "./pages/3rdPartyContractor/workForce/WorkForcePage";
import { WorkForceDetailPage } from "./pages/3rdPartyContractor/workForce/WorkForceDetailPage";





function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginReload());
  });

  const userType = useSelector((state) => state.userType?.userData?.userType);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        {/* users */}
        <Route exact path="/users" element={<UsersPage />} />
        <Route exact path="/users/:userId" element={<UserDetailsPage />} />

        {/*  contractors manager page */}
        <Route
          exact
          path="/contractorsManager"
          element={<ContractorManagerPage />}
        />

       <Route exact path="/contractorManager/:id" element={<ContractorManagerDetailsPage />} />

        {/* 3rd party contractors page */}
        <Route exact path="/3rdPartContractor" element={<Contractors3rdPartyPage />}/>
        <Route exact path="/3rdPartContractor/:id" element={<Contractors3rdPartyDetailsPage />} />

        {/* workforce page */}
        <Route exact path="/workForcePage" element={<WorkForcePage />}/>
        <Route exact path="/3rdPartContractor/workForcePage/:id" element={<WorkForceDetailPage />} />

        {/* Profile */}
        <Route exact path="/proﬁle" element={<ProfilePage />} />
        {/* auth */}
        <Route exact path="/auth/login" element={<LoginPage />} />
        <Route
          exact
          path="/auth/reset-password/initiate"
          element={<PasswordResetPage />}
        />
        <Route
          exact
          path="/auth/reset-password/confirm"
          element={<PasswordConfirmPage />}
        />
        <Route
          exact
          path="/auth/change-password"
          element={<PasswordChangePage />}
        />
        {/* Vehicles */}
        <Route exact path="/vehicles" element={<VehiclesAllPage />} />
        <Route exact path="/vehicles/:id" element={<VehiclesDetailsPage />} />
        {/* STS */}
        <Route exact path="/sts" element={<StsPage />} />
        <Route exact path="/sts/:id" element={<StsDetailsPage />} />

        {/* Landfill */}
        <Route exact path="/landfills" element={<LandfillPage />} />
        <Route exact path="/Landfills/:id" element={<LandfillDetailsPage />} />

        {/* permission */}
        <Route exact path="/rbac/permissions/" element={<PermissionsPage />} />
        <Route
          exact
          path="/rabc/permissions/:id"
          element={<PermissionDetailsPage />}
        />

        {/* role */}
        <Route exact path="/rbac/roles" element={<RolesPage />} />
        <Route exact path="/users/roles/:id" element={<RoleDetailsPage />} />
        <Route
          exact
          path="/rbac/roles/:id/permissions"
          element={<RolesAssignPermissionPage />}
        />

        {/* Dashboard */}
        <Route exact path="/dashboard" element={<Dashboard />} />

    
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
