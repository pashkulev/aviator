import React from 'react';
import AirSportBox from "./AirSportBox";

const colStyle = 'col-12 col-sm-6 col-md-4';

function AirSportsNavigationPage() {
	return (
		<div className='row py-3'>
			<AirSportBox id='gliding-box' link='/air-sports/gliding' title='Gliding' colStyle={colStyle}/>
			<AirSportBox id='hang-gliding-box' link='/air-sports/hang-gliding' title='Hang Gliding' colStyle={colStyle}/>
			<AirSportBox id='paragliding-box' link='/air-sports/paragliding' title='Paragliding' colStyle={colStyle}/>
			<AirSportBox id='speed-flying-box' link='/air-sports/speed-flying' title='Speed Flying' colStyle={colStyle}/>
			<AirSportBox id='sky-diving-box' link='/air-sports/sky-diving' title='Sky Diving' colStyle={colStyle}/>
			<AirSportBox id='wingsuit-flying-box' link='/air-sports/wingsuit-flying' title='Wingsuit Flying' colStyle={colStyle}/>
		</div>
	);
}

export default AirSportsNavigationPage;