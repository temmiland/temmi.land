/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { Page } from '@/models/page';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '@/ui/Link';
import Typography from '@/ui/Typography';
import { colors, media, whiteAlpha } from '@/styles';

const Nav = styled.nav`
	position: relative;
	min-width: 0;
	height: inherit;
	padding-right: 6.5vw;

	${media.mobile} {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 0;
	}

	${media.wide} {
		padding-right: 130px;
	}
`;

const MenuToggle = styled.button`
	display: none;

	${media.mobile} {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		appearance: none;
		cursor: pointer;
		background: none;
		border: none;
		color: ${colors.white};
		font-size: 6vw;
		padding: 2vw 6.5vw;
	}
`;

const Ul = styled.ul`
	list-style: none;
	display: inline-flex;
	flex-wrap: nowrap;
	gap: 3.47vw;
	margin: 0 0 0 0;
	padding: 0;
	height: inherit;
	place-items: center;
	white-space: nowrap;

	> li {
		flex-shrink: 0;
	}

	li {
		white-space: nowrap;
	}

	${media.mobile} {
		display: none;
		position: absolute;
		top: 100%;
		right: 3vw;
		z-index: 10;
		flex-direction: column;
		align-items: stretch;
		gap: 0;
		height: auto;
		min-width: 55vw;
		padding: 2vw;
		background: linear-gradient(135deg, rgba(30, 30, 30, 0.97) 0%, rgba(15, 15, 15, 0.97) 100%);
		border: 0.25vw solid ${whiteAlpha(0.16)};
		border-radius: 3.5vw;
		box-shadow: 0 2vw 6vw rgba(0, 0, 0, 0.45);

		&.open {
			display: flex;
		}

		li {
			width: 100%;
			box-sizing: border-box;
			text-align: left;
		}

		a {
			display: block;
			padding: 3vw 2.5vw;
		}
	}

	${media.tablet} {
		gap: 2.5vw;
		height: 10vw;
	}

	${media.wide} {
		gap: 69px;
	}
`;

type PageCardListProps = {
	pages: Array<Page>
}

/**
 * PageCardList component. Renders the site navigation links. On phone
 * viewports (<600px) it collapses into a hamburger-triggered dropdown menu;
 * on larger viewports it renders as the usual inline list.
 * @param {PageCardListProps} props - The props for the PageCardList component.
 * @returns {JSX.Element} PageCardList JSX element.
 */
export const PageCardList = ({ pages }: PageCardListProps): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);
	const navRef = useRef<HTMLElement>(null);
	const location = useLocation();
	const isHome = location.pathname === '/';

	/**
	 * Handles a navigation click. On the home page, entries with a matching
	 * section (derived from an `/#id` href, or from `sectionId` for pages that
	 * also have their own route, like Blog) are intercepted and smooth-scrolled
	 * there instead of navigating away. On every subpage the links are left
	 * untouched so they navigate directly to their target page.
	 * @param {React.MouseEvent} event - The originating click event.
	 * @param {Page} page - The clicked navigation entry.
	 */
	const handleNavClick = (event: React.MouseEvent, page: Page) => {
		setIsOpen(false);

		if (!isHome) return;

		const { href, sectionId } = page;
		const isAnchor = href.startsWith('/#');
		const targetId = sectionId ?? (isAnchor ? href.slice(2) : undefined);
		if (href !== '/' && !targetId) return;

		const target = targetId ? document.getElementById(targetId) : null;
		if (targetId && !target) return;

		event.preventDefault();

		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		} else {
			document.body.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		}
		window.history.replaceState(null, '', targetId ? `/#${targetId}` : '/');
	};

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (!navRef.current?.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	return (
		<Nav ref={ navRef }>
			<MenuToggle
				type={ 'button' }
				onClick={ () => setIsOpen(!isOpen) }
			>
				<FontAwesomeIcon icon={ isOpen ? 'xmark' : 'bars' } />
			</MenuToggle>
			<Ul className={ isOpen ? 'open' : '' }>
				{
					pages.map((page) => (
						<li
							key={ page.name }
							style={ {
								position: 'relative',
								cursor: 'pointer'
							} }
						>
							<Link
								href={ page.href }
								onClick={ (event) => handleNavClick(event, page) }
							>
								<Typography variant={ 'header' }>
									{ page.name }
								</Typography>
							</Link>
						</li>
					))
				}
			</Ul>
		</Nav>
	);
};
