/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import Typography from '@/ui/Typography';
import SkillsOverview from '@/features/skills/SkillsOverview';
import { Skill } from '@/models/skill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Trail from '@/ui/Trail';
import { media } from '@/styles';

const SkillContainer = styled.div`
	scroll-margin-top: var(--header-height);

	.skill-header {
		margin: 3.5vw 6.5vw;

		${media.tablet} {
			margin: 10vw 6.5vw 0vw 6.5vw;
		}

		${media.wide} {
			margin: 70px 130px;
		}
	}

	#skill-list {
		margin: 5vw 11vw 2vw 11vw;

		${media.mobile} {
			margin: 0 6vw;
		}

		${media.tablet} {
			margin: 12.5vw 4vw 0 4vw;
		}

		${media.wide} {
			margin: 100px 240px 40px 240px;
		}
	}
`;

/**
 * Props for the skills section.
 */
type SkillsSectionProps = {
	/** The skills shown in the overview. */
	skills: Skill[];
}

export const SkillsSection = ({ skills }: SkillsSectionProps) => (
	<SkillContainer id={ 'skills' }>
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
			animationDirection={ 'right' }
			animationSpeed={ 50 }
		>
			<div id={ 'skill-list' }>
				<SkillsOverview skills={ skills } />
			</div>
		</Trail>
	</SkillContainer>
);
