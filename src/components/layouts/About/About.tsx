/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { useEffect, useState } from 'react';
import Trail from '../../components/util/Trail';
import Typography from '../../components/util/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from 'styled-components';

const AboutContainer = styled.div`
	.about-header {
		margin: 3.5vw 6.5vw;
		display: grid;
		grid-template-columns: 70% 30%;

		@media (min-width: 320px) and (max-width: 1024px) {
			grid-template-columns: 100%;
		}

		@media (min-width: 2000px) {
			margin: 70px 130px;
		}
	}

	.about-text {
		margin: 5vw 0 0 11vw;

		@media (min-width: 2000px) {
			margin: 100px 0 0 220px;
		}
	}

	.about-card {
		width: 21.5vw;
		height: 13.5vw;
		border: 0.1vw solid #252525;
		background: #000000;
		border-radius: 1.3vw;
		float: right;
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		transition: 100ms linear 50ms;

		@media (min-width: 320px) and (max-width: 600px) {
			scale: 4;
			position: relative;
			top: 25vw;
			left: -33vw;
			margin-bottom: 50vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			scale: 2.5;
			position: relative;
			top: 15vw;
			left: -32vw;
			margin-bottom: 30vw;
		}

		@media (min-width: 2000px) {
			width: 430px;
			height: 270px;
			border: 2px solid #252525;
			border-radius: 26px;
		}

		&:hover {
			scale: 1.01;

			@media (min-width: 320px) and (max-width: 600px) {
				scale: 4.1;
			}
			@media (min-width: 600px) and (max-width: 1024px) {
				scale: 2.55;
			}
		}

		.card-name {
			padding: 1.3vw 0 0 1.3vw;
			font-size: 1.06vw;
			font-family: 'Bogart Bold', system-ui, Avenir, Helvetica, Arial, sans-serif;

			@media (min-width: 2000px) {
				padding: 26px 0 0 26px;
				font-size: 21px;
			}
		}

		.card-pronouns {
			ul {
				padding: 1.75vw 0 0 1.3vw;
				list-style: none;
				font-family: 'Bogart Light', system-ui, Avenir, Helvetica, Arial, sans-serif;
				font-size: 0.85vw;

				@media (min-width: 2000px) {
					padding: 35px 0 0 26px;
					font-size: 17px;
				}

				li {
					.card-tooltip {
						display: inline-block;

						.ant-typography {
							font-size: 0.8vw !important;

							@media (min-width: 2000px) {
								font-size: 16px !important;
							}
						}
						.card-questionmark {
							margin: 0 0 0 0.33vw;
							color: #8b8b8b;
							cursor: pointer;

							@media (min-width: 2000px) {
								margin: 0 0 0 6.5px;
							}
						}
						&:hover .card-tooltip-table {
							visibility: visible;
						}
						.card-tooltip-table {
							transition: 250ms linear 250ms;
							visibility: hidden;
							top: 102%;
							left: 0%;
							margin: 0 auto;
							padding: 1vw 1.3vw;
							background-color: #000000;
							border: 0.1vw solid #252525;
							color: #fff;
							text-align: left;
							border-radius: 1.3vw;
							position: absolute;
							width: calc(100% - 2.6vw);
							font-size: 0.85vw;
							z-index: 10000;

							@media (min-width: 2000px) {
								padding: 20px 26px;
								border: 2px solid #252525;
								border-radius: 26px;
								width: calc(100% - 52px);
								font-size: 17px;
							}

							table {
								margin-bottom: 0.66vw;

								@media (min-width: 320px) and (max-width: 600px) {
									font-size: 0.7vw;
									margin-left: -1vw;
								}

								@media (min-width: 600px) and (max-width: 1024px) {
									font-size: 0.75vw;
								}

								@media (min-width: 2000px) {
									margin-bottom: 13px;
								}

								thead td {
									padding: 0 0.1vw;
									font-family: 'Bogart Medium', system-ui, Avenir, Helvetica,
										Arial, sans-serif;

									@media (min-width: 2000px) {
										padding: 0 2px;
									}
								}
							}

							p,
							a p {
								margin: 0.2vw 0;
								color: #fff;

								@media (min-width: 320px) and (max-width: 600px) {
									font-size: 0.7vw;
								}

								@media (min-width: 600px) and (max-width: 1024px) {
									font-size: 0.75vw;
								}

								@media (min-width: 2000px) {
									margin: 4px 0;
								}

								span {
									font-family: 'Bogart Medium', system-ui, Avenir, Helvetica,
										Arial, sans-serif;
								}
							}

							a p {
								width: max-content;
								font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial,
									sans-serif;

								&:hover {
									color: #8b8b8b;
								}
							}
						}
					}
				}
			}
		}

		.card-position {
			padding: 0 0 0 1.3vw;
			font-size: 0.9vw;

			@media (min-width: 2000px) {
				padding: 0 0 0 26px;
				font-size: 18px;
			}
		}

		.card-email {
			padding: 0 0 0 1.3vw;
			font-size: 0.9vw;

			@media (min-width: 2000px) {
				padding: 0 0 0 26px;
				font-size: 18px;
			}
		}

		.card-img {
			width: 8vw;
			float: right;
			margin: -10.75vw 0.66vw 0 0;

			@media (min-width: 320px) and (max-width: 600px) {
				margin: -10.75vw 0.66vw 0 0;
			}

			@media (min-width: 2000px) {
				width: 160px;
				margin: -225px 13px 0 0;
			}
		}
	}

	.about-work {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 0.1fr 1fr;
		margin: 6.5vw 0 0 6.5vw;
		max-width: 86vw;
		grid-template-areas:
			'hwork hmember'
			'ulwork ulmember';

		@media (min-width: 320px) and (max-width: 1024px) {
			grid-template-columns: 1fr;
			grid-template-areas:
				'hwork'
				'ulwork'
				'hmember'
				'ulmember';
			margin: 8vw 0 8vw 6.5vw;
		}

		@media (min-width: 2000px) {
			max-width: 1250px;
			margin: 130px 0 0 130px;
		}

		#hwork {
			grid-area: hwork;

			@media (min-width: 320px) and (max-width: 600px) {
				margin-top: 15vw;
			}
		}
		#hmember {
			grid-area: hmember;

			@media (min-width: 320px) and (max-width: 600px) {
				margin-top: 15vw;
			}

			@media (min-width: 600px) and (max-width: 1024px) {
				margin-top: 10vw;
			}
		}
		#ulwork {
			grid-area: ulwork;
		}
		#ulmember {
			grid-area: ulmember;
		}
	}

	.about-work ul {
		margin: 0;
		padding: 0;
		list-style: none;
		max-width: 45vw;

		@media (min-width: 320px) and (max-width: 1024px) {
			max-width: 90vw;
		}

		@media (min-width: 2000px) {
			width: 875px;
		}
	}

	.about-work li {
		display: grid;
		grid-template-columns: 0.3fr 1fr 0.3fr;
		grid-template-rows: repeat(2, 1fr);
		grid-column-gap: 0;
		grid-row-gap: 0;
		background: #000000;
		border: 0.1vw solid #252525;
		border-radius: 0.66vw;
		justify-content: center;
		align-items: center;
		padding: 1vw;
		margin: 0.33vw;
		transition: 100ms linear 50ms;

		@media (min-width: 320px) and (max-width: 600px) {
			border-radius: 3vw;
			padding: 5vw;
			border: 0.4vw solid #252525;
			margin-bottom: 1.5vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			border-radius: 1.5vw;
			padding: 2vw;
			border: 0.2vw solid #252525;
			margin-bottom: 0.75vw;
		}

		@media (min-width: 2000px) {
			border: 2px solid #252525;
			border-radius: 13px;
			padding: 20px;
			margin: 6.5px;
		}

		&:hover {
			scale: 1.01;

			@media (min-width: 320px) and (max-width: 600px) {
				scale: 1.025;
			}
			@media (min-width: 600px) and (max-width: 1024px) {
				scale: 1.02;
			}
		}
	}

	.aw-company-image {
		grid-area: 1 / 1 / 4 / 2;
		width: 3.3vw;
		border-radius: 0.66vw;
		margin: 0 auto;

		@media (min-width: 320px) and (max-width: 600px) {
			width: 12vw;
			border-radius: 3vw;
			margin-right: 20px;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			width: 7.5vw;
			border-radius: 1.5vw;
		}

		@media (min-width: 2000px) {
			width: 66px;
			border-radius: 13px;
		}
	}

	.aw-jobtitle {
		grid-area: 1 / 2 / 2 / 3;
		text-align: left;
		font-size: 1vw;
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;

		@media (min-width: 320px) and (max-width: 600px) {
			font-size: 4vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			font-size: 2.25vw;
		}

		@media (min-width: 2000px) {
			border-radius: 30px;
			font-size: 20px;
		}
	}

	.aw-company {
		grid-area: 2 / 2 / 3 / 3;
		font-size: 1vw;
		font-family: 'Bogart Light', system-ui, Avenir, Helvetica, Arial, sans-serif;

		@media (min-width: 320px) and (max-width: 600px) {
			font-size: 3.3vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			font-size: 2vw;
		}

		@media (min-width: 2000px) {
			font-size: 19px;
		}
	}

	.aw-timerange {
		grid-area: 1 / 3 / 4 / 4;
		text-align: center;
		font-size: 1vw;
		font-family: 'Bogart Light', system-ui, Avenir, Helvetica, Arial, sans-serif;

		@media (min-width: 320px) and (max-width: 600px) {
			font-size: 3.8vw;
			margin-left: 20px;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			font-size: 2vw;
		}

		@media (min-width: 2000px) {
			font-size: 19px;
		}
	}
`;

export const About = () => {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		window.addEventListener(
			'scroll',
			() =>
				setScrollY(
					document.body.scrollHeight - window.innerHeight - document.body.scrollTop
				),
			true
		);
	});

	return (
		<AboutContainer id={ 'about-me' }>
			<Trail
				scrollY={ scrollY }
				visible={ {
					min: {
						phone: 0,
						tablet: 0,
						desktop: 0,
						oversize: 0
					},
					max: {
						phone: 1225,
						tablet: 1100,
						desktop: 1000,
						oversize: 1000
					}
				} }
				animationDirection={ 'left' }
				animationSpeed={ 50 }
			>
				<div className={ 'about-header' }>
					<Typography variant={ 'h1' }>
						{ 'About Me' }
						<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'mountain-city'] } />
						<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'user-astronaut'] } />
						<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'gamepad'] } />
					</Typography>
				</div>
			</Trail>
			<div className={ 'about-header' }>
				<Trail
					scrollY={ scrollY }
					visible={ {
						min: {
							phone: 0,
							tablet: 0,
							desktop: 0,
							oversize: 0
						},
						max: {
							phone: 1200,
							tablet: 1050,
							desktop: 950,
							oversize: 950
						}
					} }
					animationDirection={ 'left' }
					animationSpeed={ 50 }
				>
					<div className={ 'ah-text' }>
						<Typography variant={ 'p' }>
							{ 'Hi! I’m a Frontend and Fullstack Developer, currently based in Dresden. ' +
								'I build modern, interactive web applications using TypeScript, JavaScript' +
								', HTML, and CSS – always with the goal of turning complex requirements ' +
								'into intuitive, user-friendly interfaces.' }
						</Typography>
						<Typography variant={ 'p' }>
							{ 'I’ve worked on diverse projects across web and mobile using React, React ' +
								'Native, and Angular. I’m also well-versed in tools like GitHub, GitLab, ' +
								'Bitbucket, Jira, Confluence, and Notion – whether it\'s for version ' +
								'control, collaboration, or efficient project management.' }
						</Typography>
						<Typography variant={ 'p' }>
							{ 'I take a structured, solution-oriented approach to development and hold ' +
								'myself to high standards – whether I’m working in a team or independently ' +
								'as a freelancer.' }
						</Typography>
						<Typography variant={ 'p' }>
							{ 'Away from the screen, you’ll find me longboarding, hiking, digging in the ' +
								'garden, caring for plants, or deep in political discussions. ' +
								'My passion for storytelling and worldbuilding often finds its way into my ' +
								'work – I love exploring new ideas and blending technology with creativity.' }
						</Typography>
						<Typography variant={ 'p' }>
							{ 'I believe great software is born where curiosity, empathy, and technology ' +
								'meet. Let’s build something that doesn’t just work – but inspires. 🚀' }
						</Typography>
					</div>
				</Trail>
				<Trail
					scrollY={ scrollY }
					visible={ {
						min: {
							phone: 0,
							tablet: 0,
							desktop: 0,
							oversize: 0
						},
						max: {
							phone: 1025,
							tablet: 900,
							desktop: 950,
							oversize: 950
						}
					} }
					animationDirection={ 'right' }
					animationSpeed={ 50 }
				>
					<div className={ 'about-card' }>
						<div className={ 'card-name' }>{ 'Temmi Pietsch' }</div>
						<div className={ 'card-position' }>{ 'Frontend Developer' }</div>
						<div className={ 'card-email' }>{ 'welcome@temmi.land' }</div>
						<div className={ 'card-pronouns' }>
							<ul>
								<li>{ '🇺🇸 she/her' }</li>
								<li>{ '🇩🇪 sie/ihr' }</li>
							</ul>
						</div>
						<img src={ './me.png' } alt={ 'me' } className={ 'card-img' } />
					</div>
				</Trail>
			</div>
			<Trail
				scrollY={ scrollY }
				visible={ {
					min: {
						phone: 0,
						tablet: 0,
						desktop: 0,
						oversize: 0
					},
					max: {
						phone: 950,
						tablet: 775,
						desktop: 700,
						oversize: 700
					}
				} }
				animationDirection={ 'bottom' }
				animationSpeed={ 50 }
			>
				<div className={ 'about-work' }>
					<div id={ 'hwork' }>
						<Typography variant={ 'h3' }>{ 'Work' }</Typography>
					</div>
					<div id={ 'hmember' }>
						<Typography variant={ 'h3' }>{ 'Memberships & Volunteer work' }</Typography>
					</div>
					<div id={ 'ulwork' }>
						<ul>
							<li>
								<img
									alt={ 'adesso logo' }
									src={ './logos/adesso_se_logo.jpeg' }
									className={ 'aw-company-image' }
								/>
								<div className={ 'aw-jobtitle' }>{ 'Senior Software Engineer' }</div>
								<div className={ 'aw-company' }>{ 'adesso • Full-time' }</div>
								<div className={ 'aw-timerange' }>{ '2025 - Now' }</div>
							</li>
							<li>
								<img
									alt={ 'tp logo' }
									src={ './favicon/apple-touch-icon.png' }
									className={ 'aw-company-image' }
								/>
								<div className={ 'aw-jobtitle' }>{ 'Senior Software Engineer' }</div>
								<div className={ 'aw-company' }>
									{ 'Temmi Pietsch • Part-time self-employed' }
								</div>
								<div className={ 'aw-timerange' }>{ '2024 - Now' }</div>
							</li>

							<li>
								<img
									alt={ 'valtech mobility logo' }
									src={ './logos/valtech_mobility_gmbh_logo.jpeg' }
									className={ 'aw-company-image' }
								/>
								<div className={ 'aw-jobtitle' }>
									{ 'Frontend Developer & Consultant' }
								</div>
								<div className={ 'aw-company' }>{ 'Valtech Mobility • Full-time' }</div>
								<div className={ 'aw-timerange' }>{ '2022 - 2024' }</div>
							</li>

							<li>
								<img
									alt={ 'hydrograv logo' }
									src={ './logos/hydrograv_logo.jpeg' }
									className={ 'aw-company-image' }
								/>
								<div className={ 'aw-jobtitle' }>{ 'Full Stack Developer' }</div>
								<div className={ 'aw-company' }>{ 'hydrograv • Full-time' }</div>
								<div className={ 'aw-timerange' }>{ '2019 - 2022' }</div>
							</li>

							<li>
								<img
									alt={ 'hydrograv logo' }
									src={ './logos/hydrograv_logo.jpeg' }
									className={ 'aw-company-image' }
								/>
								<div className={ 'aw-jobtitle' }>
									{ 'Computer Science Expert - Developer' }
								</div>
								<div className={ 'aw-company' }>{ 'hydrograv • Apprenticeship' }</div>
								<div className={ 'aw-timerange' }>{ '2016 - 2019' }</div>
							</li>

							<li>
								<img
									alt={ 'hydrograv logo' }
									src={ './logos/hydrograv_logo.jpeg' }
									className={ 'aw-company-image' }
								/>
								<div className={ 'aw-jobtitle' }>
									{ 'Computer Science Expert - Developer' }
								</div>
								<div className={ 'aw-company' }>{ 'hydrograv • Internship' }</div>
								<div className={ 'aw-timerange' }>{ '2016' }</div>
							</li>
							<li>
								<img
									alt={ 'tu freiberg logo' }
									src={ './logos/tu_freibergde_logo.jpeg' }
									className={ 'aw-company-image' }
								/>
								<div className={ 'aw-jobtitle' }>
									{ 'School Internship - Software Development' }
								</div>
								<div className={ 'aw-company' }>
									{ 'TU Bergakademie Freiberg • Internship' }
								</div>
								<div className={ 'aw-timerange' }>{ '2013' }</div>
							</li>
						</ul>
					</div>
					<div id={ 'ulmember' }>
						<ul>
							<li>
								<img
									alt={ 'gruene jugend logo' }
									src={ './logos/grne_jugend_sachsen_logo.jpeg' }
									className={ 'aw-company-image' }
								/>
								<div className={ 'aw-jobtitle' }>{ 'Member' }</div>
								<div className={ 'aw-company' }>{ 'GRÜNE JUGEND' }</div>
								<div className={ 'aw-timerange' }>{ '2024 - Now' }</div>
							</li>

							<li>
								<img
									alt={ 'dresden logo' }
									src={ './logos/landeshauptstadt_dresden_logo.jpeg' }
									className={ 'aw-company-image' }
								/>
								<div className={ 'aw-jobtitle' }>{ 'Election worker' }</div>
								<div className={ 'aw-company' }>{ 'Dresden - AG Wahlhelfer' }</div>
								<div className={ 'aw-timerange' }>{ '2019 - Now' }</div>
							</li>
							<li>
								<img
									alt={ 'gruene jugend logo' }
									src={ './logos/grne_jugend_sachsen_logo.jpeg' }
									className={ 'aw-company-image' }
								/>
								<div className={ 'aw-jobtitle' }>
									{ 'Member of the Executive Board' }
								</div>
								<div className={ 'aw-company' }>{ 'GRÜNE JUGEND Dresden' }</div>
								<div className={ 'aw-timerange' }>{ '2024 - 2025' }</div>
							</li>
							<li>
								<img
									alt={ 'gruenen logo' }
									src={ './logos/bndnis_90_die_grnen_logo.jpeg' }
									className={ 'aw-company-image' }
								/>
								<div className={ 'aw-jobtitle' }>{ 'Member' }</div>
								<div className={ 'aw-company' }>{ 'BÜNDNIS 90/DIE GRÜNEN ' }</div>
								<div className={ 'aw-timerange' }>{ '2024 - 2025' }</div>
							</li>
						</ul>
					</div>
				</div>
			</Trail>
		</AboutContainer>
	);
};
