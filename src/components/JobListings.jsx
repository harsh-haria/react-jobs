import { useEffect, useState } from "react";

import JobListing from "./JobListing";
import Spinner from "./Spinner";

const JobListings = ({ isHome = false }) => {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchJobs = async () => {
			try {
				let urlLimiter = isHome ? "?_limit=3" : "";
				let response = await fetch(`http://localhost:8000/jobs${urlLimiter}`);
				let data = await response.json();
				setJobs(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchJobs();
	}, []);

	// const paginatedArray = isHome ? jobs.slice(0, 3) : jobs;
	return (
		<section className="bg-blue-50 px-4 py-10">
			<div className="container-xl lg:container m-auto">
				<h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
					{isHome ? `Recent Jobs` : `Browse Jobs`}
				</h2>
				{loading ? (
					<Spinner loading={loading} />
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{jobs.map((jobItem) => (
							<JobListing key={jobItem.id} job={jobItem} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default JobListings;
