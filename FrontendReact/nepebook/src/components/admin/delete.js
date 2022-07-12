import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
//MaterialUI
import { Container, Button, Box } from '@material-ui/core';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Create() {
	const navigate = useNavigate();
	const { id } = useParams();

	const handleSubmit = (e) => {
		e.preventDefault();
		axiosInstance
			.delete(`admin/delete/` + id)
			.catch(function (error) {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
			})
			.then(function () {

				navigate({
					pathname: '/admin/',
				});
				// window.location.reload();
				toast.success("The book is deleted Successfully!");
			});
	};

	return (
		<>

			<ToastContainer position="top-center" />
			<Container component="main" maxWidth="sm">
				<Box
					display="flex"
					justifyContent="center"
					m={1}
					p={1}
					bgcolor="background.paper"
				>
					<Button
						variant="contained"
						color="secondary"
						type="submit"
						onClick={handleSubmit}
					>
						Press here to confirm delete
					</Button>
				</Box>
			</Container>
		</>
	);
}