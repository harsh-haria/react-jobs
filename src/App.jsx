import React from "react";

import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
	const addJobSubmit = async (newJob) => {
		// console.log(newJob);
		const newJobSave = await fetch("/api/jobs", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newJob),
		});
		return;
	};

	const deleteJob = async (id) => {
		const deleteJobSave = await fetch(`/api/jobs/${id}`, {
			method: "DELETE",
		});
		// console.log(id);
		return;
	};

	const updateJob = async (updatedJob) => {
		const updateJobSave = await fetch(`/api/jobs/${updatedJob.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedJob),
		});
		return;
	};

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path="/jobs" element={<JobsPage />} />
				<Route
					path="/jobs/:id"
					element={<JobPage deleteJob={deleteJob} />}
					loader={jobLoader}
				/>
				<Route
					path="/edit-job/:id"
					element={<EditJobPage updateJob={updateJob} />}
					loader={jobLoader}
				/>
				<Route
					path="/add-job"
					element={<AddJobPage addJobSubmit={addJobSubmit} />}
				/>
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};

export default App;
