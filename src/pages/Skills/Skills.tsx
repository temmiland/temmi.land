/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SkillGrid from '@/features/skills/SkillGrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@/ui/Typography';
import Header from '@/features/header/Header';
import Trail from '@/ui/Trail';
import Filter from '@/ui/Filter';
import PageLayout from '@/ui/PageLayout';
import SearchInput from '@/ui/SearchInput';
import useDropdown from '@/ui/Dropdown';
import { SkillCategory } from '@/models/skillcategory';
import { skills } from '@/data/skills';
import { downloadFile, skillsToCsv, skillsToJson } from '@/utils/skillExport';
import { DEFAULT_SKILL_SORT, SKILL_SORT_LABELS, SkillSortOption } from '@/utils/skillSort';
import { colors, fonts, media, whiteAlpha } from '@/styles';

const SKILL_SORT_OPTIONS = Object.keys(SKILL_SORT_LABELS) as SkillSortOption[];

const SkillSection = styled.section`
	margin: 0;
	padding: 3.6vw 6vw 16vw 6vw;
	position: relative;
	background: ${colors.surface};
	display: grid;

	${media.mobile} {
		padding: 22.6vw 0vw 60vw 0vw;
	}

	${media.tablet} {
		padding: 15vw 0vw 65vw 0vw;
	}

	.skill-content {
		${media.wide} {
			margin: 0 auto;
		}
	}

	.skill-header {
		margin: 3.5vw 6.5vw;
	}
`;

const skillCategoryOptions = Object.values(SkillCategory).map((category) => ({
	value: category,
	label: category
}));

const FilterExportRow = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-areas:
		'chips controls'
		'search controls';
	align-items: start;

	${media.mobile} {
		grid-template-columns: 1fr;
		grid-template-areas:
			'chips'
			'controls'
			'search';
	}

	${media.tablet} {
		grid-template-columns: 1fr;
		grid-template-areas:
			'chips'
			'controls'
			'search';
	}
`;

const FilterCol = styled.div`
	grid-area: chips;
`;

const SearchRow = styled.div`
	grid-area: search;
	padding: 0 6.5vw;
	margin: 0 0 1vw 0;

	${media.mobile} {
		margin: 0 0 3vw 0;
	}

	${media.tablet} {
		margin: 0 0 2vw 0;
	}
`;

const ControlsCol = styled.div`
	grid-area: controls;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 0.6vw;
	padding: 0 6.5vw 0 0;
	margin: 1.5vw 0 3vw 0;

	${media.mobile} {
		align-items: flex-start;
		gap: 2vw;
		padding: 0 6.5vw;
		margin: 1vw 0 5vw;
	}

	${media.tablet} {
		align-items: flex-start;
		gap: 1vw;
		padding: 0 6.5vw;
		margin: 3vw 0;
	}

	${media.wide} {
		gap: 12px;
		margin: 30px 0 60px 0;
	}
`;

const DropdownMenu = styled.div`
	position: relative;
`;

const DropdownTrigger = styled.button`
	display: inline-flex;
	align-items: center;
	gap: 0.45vw;
	padding: 0.5vw 1.1vw;
	border: 0.075vw solid ${whiteAlpha(0.35)};
	border-radius: 1.3vw;
	background: ${whiteAlpha(0.06)};
	color: ${colors.white};
	cursor: pointer;
	font-family: ${fonts.medium};
	font-size: 0.9vw;
	transition: 100ms linear;

	&:hover,
	&.open {
		color: ${colors.black};
		background: ${colors.white};
	}

	svg {
		font-size: 0.95vw;

		${media.mobile} {
			font-size: 3.5vw;
		}

		${media.tablet} {
			font-size: 2vw;
		}

		${media.wide} {
			font-size: 18px;
		}
	}

	.caret {
		transition: transform 120ms ease;
	}

	&.open .caret {
		transform: rotate(180deg);
	}

	${media.mobile} {
		gap: 1.5vw;
		padding: 1.5vw 3.5vw;
		border: 0.25vw solid ${whiteAlpha(0.35)};
		border-radius: 4vw;
		font-size: 3.25vw;
	}

	${media.tablet} {
		gap: 1vw;
		padding: 0.75vw 1.5vw;
		border: 0.125vw solid ${whiteAlpha(0.35)};
		border-radius: 2vw;
		font-size: 2vw;
	}

	${media.wide} {
		gap: 9px;
		padding: 10px 22px;
		border: 1px solid ${whiteAlpha(0.35)};
		border-radius: 26px;
		font-size: 18px;
	}
`;

const DropdownPanel = styled.div`
	position: absolute;
	top: calc(100% + 0.5vw);
	right: 0;
	z-index: 10;
	display: flex;
	flex-direction: column;
	gap: 0.2vw;
	min-width: 11vw;
	padding: 0.35vw;
	background: linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%);
	border: 0.07vw solid ${whiteAlpha(0.16)};
	border-radius: 0.7vw;
	backdrop-filter: blur(0.7vw);
	-webkit-backdrop-filter: blur(0.7vw);
	box-shadow: 0 0.5vw 1.5vw rgba(0, 0, 0, 0.35);

	button {
		display: flex;
		align-items: center;
		gap: 0.55vw;
		padding: 0.5vw 0.7vw;
		border: none;
		border-radius: 0.4vw;
		background: transparent;
		color: ${colors.white};
		cursor: pointer;
		text-align: left;
		font-family: ${fonts.medium};
		font-size: 0.85vw;
		transition: 100ms linear;

		&:hover {
			background: ${whiteAlpha(0.12)};
		}

		&.active {
			background: ${whiteAlpha(0.16)};
			color: ${colors.accentBlue};
		}
	}

	${media.mobile} {
		left: 0;
		right: auto;
		min-width: 45vw;
		padding: 1.5vw;
		border-radius: 3.5vw;
		gap: 1vw;

		button {
			padding: 2vw 2.5vw;
			border-radius: 2vw;
			gap: 2vw;
			font-size: 3.25vw;
		}
	}

	${media.tablet} {
		left: 0;
		right: auto;
		min-width: 22vw;
		padding: 0.8vw;
		border-radius: 1.6vw;

		button {
			padding: 0.9vw 1.2vw;
			border-radius: 0.9vw;
			font-size: 2vw;
		}
	}

	${media.wide} {
		min-width: 200px;
		padding: 7px;
		border-radius: 14px;
		gap: 4px;

		button {
			padding: 10px 14px;
			border-radius: 8px;
			font-size: 17px;
		}
	}
`;

export default function Skills() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [categoryToMatch, setCategoryToMatch] = useState(searchParams.get('category') ?? '');
	const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ?? '');
	const [sortBy, setSortBy] = useState<SkillSortOption>(DEFAULT_SKILL_SORT);
	const sortDropdown = useDropdown();
	const exportDropdown = useDropdown();

	// Keep the ?category= and ?search= query params in sync with the filter and
	// input so the URL stays shareable and survives a reload. Replace (not push)
	// so we don't add a history entry per keystroke.
	useEffect(() => {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			if (categoryToMatch) {
				next.set('category', categoryToMatch);
			} else {
				next.delete('category');
			}
			if (searchQuery) {
				next.set('search', searchQuery);
			} else {
				next.delete('search');
			}
			return next.toString() === prev.toString() ? prev : next;
		}, {
			replace: true
		});
	}, [categoryToMatch, searchQuery, setSearchParams]);

	const normalizedSearchQuery = searchQuery.trim().toLowerCase();

	const exportData = skills
		.filter((skill) => !categoryToMatch || skill.category === categoryToMatch)
		.filter((skill) => (
			!normalizedSearchQuery || skill.name.toLowerCase().includes(normalizedSearchQuery)
		));

	const fileSuffix = categoryToMatch
		? `-${categoryToMatch
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '')}`
		: '';

	const handleExportJson = () => {
		downloadFile(`skills${fileSuffix}.json`, skillsToJson(exportData), 'application/json');
		exportDropdown.close();
	};

	const handleExportCsv = () => {
		downloadFile(`skills${fileSuffix}.csv`, skillsToCsv(exportData), 'text/csv');
		exportDropdown.close();
	};

	return (
		<PageLayout header={ <Header animationDirection={ 'left' } /> }>
			<SkillSection>
				<div className={ 'skill-content' }>
					<Trail
						animationDirection={ 'left' }
						animationSpeed={ 50 }
					>
						<div className={ 'skill-header' }>
							<Typography variant={ 'h1' }>
								{ 'Skills' }
								<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'star'] } />
								<FontAwesomeIcon
									className={ 'h-icon' }
									icon={ ['fas', 'wand-magic-sparkles'] }
								/>
								<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'code'] } />
							</Typography>
						</div>
					</Trail>
					<Trail
						animationDirection={ 'left' }
						animationSpeed={ 50 }
						animationDelay={ 175 }
					>
						<FilterExportRow>
							<FilterCol>
								<Filter
									options={ skillCategoryOptions }
									activeValue={ categoryToMatch }
									onChange={ setCategoryToMatch }
								/>
							</FilterCol>
							<ControlsCol>
								<DropdownMenu ref={ exportDropdown.ref }>
									<DropdownTrigger
										className={ exportDropdown.isOpen ? 'open' : '' }
										onClick={ exportDropdown.toggle }
									>
										<FontAwesomeIcon icon={ ['fas', 'file-export'] } />
										{ 'Export' }
										<FontAwesomeIcon
											className={ 'caret' }
											icon={ ['fas', 'caret-down'] }
										/>
									</DropdownTrigger>
									{ exportDropdown.isOpen ? (
										<DropdownPanel>
											<button onClick={ handleExportJson }>
												<FontAwesomeIcon icon={ ['fas', 'file-code'] } />
												{ 'Export JSON' }
											</button>
											<button onClick={ handleExportCsv }>
												<FontAwesomeIcon icon={ ['fas', 'file-csv'] } />
												{ 'Export CSV' }
											</button>
										</DropdownPanel>
									) : null }
								</DropdownMenu>
								<DropdownMenu ref={ sortDropdown.ref }>
									<DropdownTrigger
										className={ sortDropdown.isOpen ? 'open' : '' }
										onClick={ sortDropdown.toggle }
									>
										<FontAwesomeIcon icon={ ['fas', 'arrow-down-wide-short'] } />
										{ `Sort: ${SKILL_SORT_LABELS[sortBy]}` }
										<FontAwesomeIcon
											className={ 'caret' }
											icon={ ['fas', 'caret-down'] }
										/>
									</DropdownTrigger>
									{ sortDropdown.isOpen ? (
										<DropdownPanel>
											{ SKILL_SORT_OPTIONS.map((option) => (
												<button
													key={ option }
													className={ option === sortBy ? 'active' : '' }
													onClick={ () => {
														setSortBy(option);
														sortDropdown.close();
													} }
												>
													{ SKILL_SORT_LABELS[option] }
												</button>
											)) }
										</DropdownPanel>
									) : null }
								</DropdownMenu>
							</ControlsCol>
							<SearchRow>
								<SearchInput
									value={ searchQuery }
									onChange={ setSearchQuery }
									placeholder={ 'Search skills…' }
								/>
							</SearchRow>
						</FilterExportRow>
						<SkillGrid
							skills={ skills }
							categoryToMatch={ categoryToMatch }
							sortBy={ sortBy }
							searchQuery={ searchQuery }
						/>
					</Trail>
				</div>
			</SkillSection>
		</PageLayout>
	);
}
