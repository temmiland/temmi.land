/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import Link from '../../components/util/Link';
import Typography from '../../components/util/Typography';

export const ImprintContent = () => (
	<>
		<Typography variant={ 'p' }>
			{ 'The legal information on my website is available only in German. ' }
			{ 'Please feel free to contact me with any inquiries.' }
		</Typography>
		<Typography variant={ 'h2' }>{ 'Anbieter' }</Typography>
		<Typography variant={ 'p' }>
			{ 'Temmi Pietsch' }
			<br />
			{ 'c/o Postflex #7561' }
			<br />
			{ 'Emsdettener Str. 10' }
			<br />
			{ 'D-48268 Greven' }
			<br />
			{ 'Keine Pakete oder Päckchen - Annahme wird verweigert!' }
		</Typography>

		<Typography variant={ 'h2' }>{ 'Kontakt' }</Typography>
		<Typography variant={ 'p' }>
			{
				'E-Mail: welcome@temmi.land'
			}
		</Typography>
		<br />
		<Typography variant={ 'p' }>
			{
				'Wir sind weder verpflichtet noch bereit, an einem'
				+ ' Streitbeilegungsverfahren teilzunehmen.'
			}
		</Typography>
		<br />
		<Typography variant={ 'h2' }>{ 'Datenschutz' }</Typography>
		<Typography variant={ 'p' }>
			{
				'Wir wissen, dass Dir Datenschutz wichtig ist. Daher legen wir großen Wert auf' +
			' den Schutz Deiner persönlichen Daten. Weitere Informationen findest Du in unserer '
			}
			<Link
				href={
					'./privacy'
				}>
				{ 'Datenschutzerklärung' }
			</Link>
			{ '.' }
		</Typography>

		<Typography variant={ 'h2' }>{ 'Haftung für Links' }</Typography>
		<Typography variant={ 'p' }>
			{
				'Unser Angebot enthält Links zu externen Webseiten Dritter, deren Inhalte wir' +
			' nicht beeinflussen können. Aus diesem Grund übernehmen wir keine Haftung für diese' +
			' fremden Inhalte. Verantwortlich für die Inhalte der verlinkten Seiten sind' +
			' ausschließlich deren jeweilige Anbieter oder Betreiber. Zum Zeitpunkt der' +
			' Verlinkung haben wir die verlinkten Seiten auf mögliche Rechtsverstöße überprüft' +
			' und konnten keine rechtswidrigen Inhalte feststellen. Eine ständige inhaltliche' +
			' Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Hinweise auf' +
			' Rechtsverletzungen nicht zumutbar. Sollten uns Rechtsverletzungen bekannt werden,' +
			' werden wir derartige Links umgehend entfernen.'
			}
		</Typography>
	</>
);
