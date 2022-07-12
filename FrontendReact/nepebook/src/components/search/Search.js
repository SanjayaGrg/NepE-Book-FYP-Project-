import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import NavHeader from '../navbar/NavHeader';

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

const Search = () => {
	const classes = useStyles();
	const search = 'search';
	const [appState, setAppState] = useState({
		search: '',
		posts: [],
	});

	useEffect(() => {
		axiosInstance.get(search + '/' + window.location.search).then((res) => {
			const allPosts = res.data;
			setAppState({ posts: allPosts });
			console.log(res.data);
		});
	}, [setAppState]);

	return (
		<React.Fragment>
			<NavHeader />
			<div style={{ backgroundColor: "#000", color: "#fff" }}>
				<Container maxWidth="md" component="main" style={{ backgroundColor: "#000", color: "#fff" }}>
					<h1>Searched Results</h1>
					<Grid container spacing={5} alignItems="flex-end" style={{ backgroundColor: "#000", color: "#fff" }}>
						{appState.posts.map((post) => {
							return (

								// Enterprise card is full width at sm breakpoint
								<Grid item key={post.id} xs={10} md={4}>
									<Card className={classes.card} style={{
										width: '15rem',
										height: '21rem',
										marginTop: '15px'
									}}>
										<Link
											color="textPrimary"
											href={`/p-${post?.title}-${post?.id}`}
											className={classes.link}
										>
											<CardMedia
												className={classes.cardMedia}
												image={post.image}
												title="Image title"
												style={{
													height: '200px',
													width: '100%',
												}}
											/>
											<CardContent className={classes.cardContent}>
												<Typography
													gutterBottom
													variant="h6"
													component="h2"
													className={classes.postTitle}
												>
													{post.title.substr(0, 50)}
												</Typography>
											</CardContent>
										</Link>

									</Card>
								</Grid>
							);
						})}
					</Grid>
				</Container>
			</div>
		</React.Fragment>
	);
};
export default Search;