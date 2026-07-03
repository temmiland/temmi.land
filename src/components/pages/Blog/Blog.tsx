/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Footer from '../../layouts/Footer';
import BlogGrid from '../../widgets/BlogGrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '../../components/util/Typography';
import Header from '../../layouts/Header';
import Trail from '../../components/util/Trail';

const HeaderSection = styled.section`
	margin: 0;
	padding: 0;
`;

const BlogSection = styled.section`
	margin: 0;
	padding: 3.6vw 6vw 16vw 6vw;
	position: relative;
	background: #141414;
	display: grid;

	@media (min-width: 320px) and (max-width: 600px) {
		padding: 22.6vw 0vw 60vw 0vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		padding: 15vw 0vw 65vw 0vw;
	}

	.blog-content {
		@media (min-width: 2000px) {
			margin: 0 auto;
		}
	}

	.blog-header {
		margin: 3.5vw 6.5vw;
	}
`;

const FooterSection = styled.section`
	padding: 2.4vw 0;

	@media (min-width: 320px) and (max-width: 600px) {
		padding: 12vw 0;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		padding: 5vw 0;
	}

	@media (min-width: 2000px) {
		padding: 48px 0;
	}
`;

const PageGradient = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 400;
	bottom: 0;
	pointer-events: none;

	@media (min-width: 2000px) {
		background: linear-gradient(
				90deg,
				rgba(0, 0, 0, 1) 250px,
				rgba(0, 0, 0, 0) 750px,
				rgba(0, 0, 0, 0) 2750px,
				rgba(0, 0, 0, 1) 3250px
			)
			no-repeat;
		background-attachment: fixed;
		background-size: 3500px 100%;
		background-position: center;
		min-height: 100%;
		min-width: 3250px;
		margin: 0;
	}
`;

const PageMountains = styled.div`
	position: relative;
	max-width: 3000px;
	height: 34vw;
	margin-left: auto;
	margin-right: auto;
	z-index: 300;
	background: url(/footer.svg);
	background-repeat: no-repeat;
	pointer-events: none;
	margin-top: -46.25vw;

	@media (min-width: 320px) and (max-width: 600px) {
		background-size: 265vw;
		height: 100vw;
		background-position: right;
		margin-top: -147.5vw;
		margin-right: -20vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		background-size: 265vw;
		height: 100vw;
		background-position: right;
		margin-top: -120vw;
		margin-right: -20vw;
	}

	@media (min-width: 2000px) {
		background-size: cover;
		height: 1000px;
		margin-top: -1230px;
		background-position: center;
	}
`;

const SearchRow = styled.div`
	padding: 0 6.5vw;
	margin: 1.5vw 0 0 0;

	@media (min-width: 320px) and (max-width: 600px) {
		margin: 4vw 0 0 0;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		margin: 3vw 0 0 0;
	}
`;

const SearchInputWrapper = styled.div`
	position: relative;
	max-width: 39vw;

	svg {
		position: absolute;
		top: 50%;
		left: 1vw;
		transform: translateY(-50%);
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.9vw;
		pointer-events: none;
	}

	input {
		box-sizing: border-box;
		width: 100%;
		padding: 1.1vw 2.6vw;
		border: 0.075vw solid rgba(255, 255, 255, 0.35);
		border-radius: 2.6vw;
		background: rgba(255, 255, 255, 0.06);
		color: #ffffff;
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		font-size: 0.9vw;
		transition: 100ms linear;

		&::placeholder {
			color: rgba(255, 255, 255, 0.45);
		}

		&:focus {
			outline: none;
			border-color: rgba(255, 255, 255, 0.6);
			background: rgba(255, 255, 255, 0.1);
		}
	}

	.clear-search {
		position: absolute;
		top: 50%;
		right: 0.9vw;
		transform: translateY(-50%);
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.9vw;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;

		&:hover {
			color: #ffffff;
		}
	}

	@media (min-width: 320px) and (max-width: 600px) {
		max-width: 100%;

		svg {
			left: 3.5vw;
			font-size: 3.5vw;
		}

		input {
			padding: 4vw 9vw;
			border: 0.25vw solid rgba(255, 255, 255, 0.35);
			border-radius: 8vw;
			font-size: 3.25vw;
		}

		.clear-search {
			right: 3vw;
			font-size: 3.25vw;
		}
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		max-width: 100%;

		svg {
			left: 1.5vw;
			font-size: 2vw;
		}

		input {
			padding: 1.8vw 4vw;
			border: 0.125vw solid rgba(255, 255, 255, 0.35);
			border-radius: 4vw;
			font-size: 2vw;
		}

		.clear-search {
			right: 1.5vw;
			font-size: 2vw;
		}
	}

	@media (min-width: 2000px) {
		max-width: 780px;

		svg {
			left: 14px;
			font-size: 18px;
		}

		input {
			padding: 20px 38px;
			border: 1px solid rgba(255, 255, 255, 0.35);
			border-radius: 52px;
			font-size: 18px;
		}

		.clear-search {
			right: 12px;
			font-size: 16px;
		}
	}
`;

export default function Blog() {
	const [searchParams] = useSearchParams();
	const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ?? '');

	return (
		<>
			<HeaderSection>
				<Header animationDirection={ 'left' } />
			</HeaderSection>
			<BlogSection>
				<div className={ 'blog-content' }>
					<Trail
						animationDirection={ 'left' }
						animationSpeed={ 50 }
					>
						<div className={ 'blog-header' }>
							<Typography variant={ 'h1' }>
								{ 'Blog' }
								<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'feather'] } />
								<FontAwesomeIcon
									className={ 'h-icon' }
									icon={ ['fas', 'wand-magic-sparkles'] }
								/>
								<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'pen-nib'] } />
							</Typography>
						</div>
					</Trail>
					<Trail
						animationDirection={ 'left' }
						animationSpeed={ 50 }
						animationDelay={ 175 }
					>
						<SearchRow>
							<SearchInputWrapper>
								<FontAwesomeIcon icon={ ['fas', 'magnifying-glass'] } />
								<input
									type={ 'text' }
									value={ searchQuery }
									placeholder={ 'Search articles…' }
									onChange={ (event) => setSearchQuery(event.target.value) }
								/>
								{ searchQuery ? (
									<button
										type={ 'button' }
										className={ 'clear-search' }
										onClick={ () => setSearchQuery('') }
									>
										<FontAwesomeIcon icon={ ['fas', 'xmark'] } />
									</button>
								) : null }
							</SearchInputWrapper>
						</SearchRow>
						<BlogGrid searchQuery={ searchQuery } />
					</Trail>
				</div>
			</BlogSection>
			<FooterSection>
				<Footer />
			</FooterSection>
			<PageGradient />
			<PageMountains />
		</>
	);
}
