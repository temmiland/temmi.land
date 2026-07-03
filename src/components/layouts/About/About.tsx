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
	scroll-margin-top: var(--header-height);

	.about-header {
		margin: 3.5vw 6.5vw;
		display: grid;
		grid-template-columns: 1fr auto;
		column-gap: 2.5vw;

		@media (min-width: 320px) and (max-width: 1024px) {
			grid-template-columns: 100%;
		}

		@media (min-width: 2000px) {
			margin: 70px 130px;
			column-gap: 50px;
		}
	}

	.about-text {
		margin: 5vw 0 0 11vw;

		@media (min-width: 2000px) {
			margin: 100px 0 0 220px;
		}
	}

	.about-card {
		box-sizing: border-box;
		width: 20vw;
		height: 20vw;
		align-self: start;
		overflow: hidden;
		padding: 1.6vw 2vw 1.3vw;
		border: 0.07vw solid rgba(255, 255, 255, 0.1);
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.08) 0%,
			rgba(255, 255, 255, 0.03) 100%
		);
		backdrop-filter: blur(0.7vw);
		--webkit-backdrop-filter: blur(0.7vw);
		border-radius: 0.7vw;
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		transition: 120ms ease;

		@media (min-width: 320px) and (max-width: 600px) {
			width: 100%;
			height: auto;
			margin: 6vw 0 8vw;
			padding: 6vw 6vw 5vw;
			border: 0.25vw solid rgba(255, 255, 255, 0.1);
			border-radius: 3.5vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			width: 45vw;
			height: auto;
			margin: 6vw auto 5vw;
			padding: 3vw 3.5vw;
			border: 0.125vw solid rgba(255, 255, 255, 0.1);
			border-radius: 1.8vw;
		}

		@media (min-width: 2000px) {
			width: 400px;
			height: 400px;
			padding: 32px 38px 26px;
			border: 1px solid rgba(255, 255, 255, 0.1);
			border-radius: 14px;
		}

		&:hover {
			border-color: rgba(255, 255, 255, 0.28);
			background: linear-gradient(
				135deg,
				rgba(255, 255, 255, 0.13) 0%,
				rgba(255, 255, 255, 0.05) 100%
			);
			transform: translateY(-0.15vw);
		}

		.card-name {
			font-size: 1.2vw;
			font-family: 'Bogart Bold', system-ui, Avenir, Helvetica, Arial, sans-serif;

			@media (min-width: 320px) and (max-width: 600px) {
				font-size: 5vw;
			}

			@media (min-width: 600px) and (max-width: 1024px) {
				font-size: 2.8vw;
			}

			@media (min-width: 2000px) {
				font-size: 24px;
			}
		}

		.card-handle {
			margin: 0.2vw 0 0.9vw;
			padding: 0 0 0.9vw;
			font-size: 0.85vw;
			color: #8b8b8b;
			border-bottom: 0.1vw solid rgba(255, 255, 255, 0.1);
			font-family: 'Bogart Light', system-ui, Avenir, Helvetica, Arial, sans-serif;

			@media (min-width: 320px) and (max-width: 600px) {
				margin: 1vw 0 3vw;
				padding: 0 0 3vw;
				font-size: 3.6vw;
				border-bottom: 0.2vw solid rgba(255, 255, 255, 0.1);
			}

			@media (min-width: 600px) and (max-width: 1024px) {
				margin: 0.5vw 0 1.5vw;
				padding: 0 0 1.5vw;
				font-size: 2vw;
				border-bottom: 0.1vw solid rgba(255, 255, 255, 0.1);
			}

			@media (min-width: 2000px) {
				margin: 4px 0 18px;
				padding: 0 0 18px;
				font-size: 17px;
				border-bottom: 2px solid rgba(255, 255, 255, 0.1);
			}
		}

		.card-info {
			margin: 0;
			padding: 0;
			list-style: none;

			li {
				display: flex;
				align-items: center;
				gap: 0.66vw;
				padding: 0.25vw 0;
				font-size: 0.85vw;
				font-family: 'Bogart Light', system-ui, Avenir, Helvetica, Arial, sans-serif;

				@media (min-width: 320px) and (max-width: 600px) {
					gap: 2.5vw;
					padding: 1vw 0;
					font-size: 3.6vw;
				}

				@media (min-width: 600px) and (max-width: 1024px) {
					gap: 1.2vw;
					padding: 0.5vw 0;
					font-size: 2vw;
				}

				@media (min-width: 2000px) {
					gap: 13px;
					padding: 5px 0;
					font-size: 17px;
				}

				svg {
					width: 0.9vw;
					color: #8b8b8b;
					flex-shrink: 0;

					@media (min-width: 320px) and (max-width: 600px) {
						width: 3.8vw;
					}

					@media (min-width: 600px) and (max-width: 1024px) {
						width: 2.1vw;
					}

					@media (min-width: 2000px) {
						width: 18px;
					}
				}

				a {
					color: #fff;
					text-decoration: none;
					transition: color 0.3s;

					&:hover {
						color: #8b8b8b;
					}
				}
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
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.08) 0%,
			rgba(255, 255, 255, 0.03) 100%
		);
		border: 0.07vw solid rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(0.7vw);
		--webkit-backdrop-filter: blur(0.7vw);
		border-radius: 0.7vw;
		justify-content: center;
		align-items: center;
		padding: 1vw;
		margin: 0.55vw;
		transition: 120ms ease;

		@media (min-width: 320px) and (max-width: 600px) {
			border-radius: 3.5vw;
			padding: 5vw;
			border: 0.25vw solid rgba(255, 255, 255, 0.1);
			margin-bottom: 2.2vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			border-radius: 1.8vw;
			padding: 2vw;
			border: 0.125vw solid rgba(255, 255, 255, 0.1);
			margin-bottom: 1.1vw;
		}

		@media (min-width: 2000px) {
			border: 1px solid rgba(255, 255, 255, 0.1);
			border-radius: 14px;
			padding: 20px;
			margin: 11px;
		}

		&:hover {
			border-color: rgba(255, 255, 255, 0.28);
			background: linear-gradient(
				135deg,
				rgba(255, 255, 255, 0.13) 0%,
				rgba(255, 255, 255, 0.05) 100%
			);
			transform: translateY(-0.15vw);
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

const HOME_TIME_ZONE = 'Europe/Berlin';

/**
 * Gets the UTC offset (in minutes, east-positive) of a timezone at a given date.
 * Needed to compare Temmi's local time zone against the visitor's.
 */
const getTimezoneOffsetMinutes = (timeZone: string, date: Date): number => {
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone,
		hourCycle: 'h23',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	})
		.formatToParts(date)
		.reduce<Record<string, string>>((acc, part) => {
			acc[part.type] = part.value;
			return acc;
		}, {});

	const asUTC = Date.UTC(
		Number(parts.year),
		Number(parts.month) - 1,
		Number(parts.day),
		Number(parts.hour),
		Number(parts.minute),
		Number(parts.second)
	);

	return (asUTC - date.getTime()) / 60000;
};

export const About = () => {
	const [now, setNow] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => setNow(new Date()), 30000);
		return () => clearInterval(interval);
	}, []);

	const homeTime = now.toLocaleTimeString('de-DE', {
		timeZone: HOME_TIME_ZONE,
		hour: '2-digit',
		minute: '2-digit'
	});

	const hourDiff = Math.round(
		(getTimezoneOffsetMinutes(HOME_TIME_ZONE, now) + now.getTimezoneOffset()) / 60
	);

	const timeCompare =
		hourDiff === 0
			? 'same time'
			: `${Math.abs(hourDiff)}h ${hourDiff > 0 ? 'ahead' : 'behind'}`;

	return (
		<AboutContainer id={ 'about-me' }>
			<Trail
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
					animationDirection={ 'left' }
					animationSpeed={ 50 }
				>
					<div className={ 'ah-text' }>
						<Typography variant={ 'p' }>
							{ 'Hi, I\'m Temmi — a Senior Software Engineer based in Leipzig, Germany. ' +
								'I build modern web and mobile applications with TypeScript, React, React ' +
								'Native, Angular, and Spring (Java/Kotlin), turning complex requirements ' +
								'into clean, intuitive interfaces.' }
						</Typography>
						<Typography variant={ 'p' }>
							{ 'With years of experience across web, mobile, and backend projects, I work ' +
								'confidently across the full stack — in teams and as a freelancer. I use ' +
								'AI tooling strategically to ship faster without cutting corners.' }
						</Typography>
						<Typography variant={ 'p' }>
							{
								'High standards and structured thinking — not as a motto, but as a habit.'
							}
						</Typography>
						<Typography variant={ 'p' }>
							{ '🌸 Open for new projects!' }
							<br />
							{ ' Got something interesting? Let\'s talk!' }
						</Typography>
					</div>
				</Trail>
				<Trail
					animationDirection={ 'right' }
					animationSpeed={ 50 }
				>
					<div className={ 'about-card' }>
						<div className={ 'card-name' }>{ 'Temmi Pietsch' }</div>
						<div className={ 'card-handle' }>{ 'temmiland · she/her' }</div>
						<ul className={ 'card-info' }>
							<li>
								<FontAwesomeIcon icon={ ['fas', 'briefcase'] } />
								<span>{ 'adesso SE' }</span>
							</li>
							<li>
								<FontAwesomeIcon icon={ ['fas', 'location-dot'] } />
								<span>{ 'Leipzig, Germany' }</span>
							</li>
							<li>
								<FontAwesomeIcon icon={ ['fas', 'clock'] } />
								<span>{ `${homeTime} - ${timeCompare}` }</span>
							</li>
							<li>
								<FontAwesomeIcon icon={ ['fas', 'envelope'] } />
								<a href={ 'mailto:welcome@temmi.land' }>{ 'welcome@temmi.land' }</a>
							</li>
							<li>
								<FontAwesomeIcon icon={ ['fab', 'linkedin'] } />
								<a
									href={ 'https://www.linkedin.com/in/temmi-pietsch/' }
									target={ '_blank' }
									rel={ 'noreferrer' }
								>
									{ 'in/temmi-pietsch' }
								</a>
							</li>
							<li>
								<FontAwesomeIcon icon={ ['fab', 'github'] } />
								<a
									href={ 'https://github.com/temmiland' }
									target={ '_blank' }
									rel={ 'noreferrer' }
								>
									{ 'temmiland' }
								</a>
							</li>
						</ul>
					</div>
				</Trail>
			</div>
			<Trail
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
								<div className={ 'aw-jobtitle' }>{ 'Founder' }</div>
								<div className={ 'aw-company' }>
									{ 'temmiland • Part-time self-employed' }
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
									alt={ 'leipzig logo' }
									src={ './logos/stadt_leipzig_logo.jpeg' }
									className={ 'aw-company-image' }
								/>
								<div className={ 'aw-jobtitle' }>{ 'Election worker' }</div>
								<div className={ 'aw-company' }>{ 'Stadt Leipzig' }</div>
								<div className={ 'aw-timerange' }>{ '2026 - Now' }</div>
							</li>
							<li>
								<img
									alt={ 'gruene jugend logo' }
									src={ './logos/grne_jugend_sachsen_logo.jpeg' }
									className={ 'aw-company-image' }
								/>
								<div className={ 'aw-jobtitle' }>{ 'Member' }</div>
								<div className={ 'aw-company' }>{ 'GRÜNE JUGEND' }</div>
								<div className={ 'aw-timerange' }>{ '2024 - 2026' }</div>
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
							<li>
								<img
									alt={ 'dresden logo' }
									src={ './logos/landeshauptstadt_dresden_logo.jpeg' }
									className={ 'aw-company-image' }
								/>
								<div className={ 'aw-jobtitle' }>{ 'Election worker' }</div>
								<div className={ 'aw-company' }>{ 'Landeshauptstadt Dresden' }</div>
								<div className={ 'aw-timerange' }>{ '2019 - 2026' }</div>
							</li>
						</ul>
					</div>
				</div>
			</Trail>
		</AboutContainer>
	);
};
