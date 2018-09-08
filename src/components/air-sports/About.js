import React from 'react';
import {Link} from 'react-router-dom';
import SideBar from "../common/navigation/SideBar";

let disciplinesInfo = {
	"gliding": {
		description: "Gliding is a recreational activity and competitive air sport in which pilots fly unpowered aircraft known as gliders or sailplanes using naturally occurring currents of rising air in the atmosphere to remain airborne. The word soaring is also used for the sport. Gliding as a sport began in the 1920s. Initially the objective was to increase the duration of flights but soon pilots attempted cross-country flights away from the place of launch. Improvements in aerodynamics and in the understanding of weather phenomena have allowed greater distances at higher average speeds. Long distances are now flown using any of the main sources of rising air: ridge lift, thermals and lee waves. When conditions are favourable, experienced pilots can now fly hundreds of kilometres before returning to their home airfields; occasionally flights of more than 1,000 kilometres (621 mi) are achieved. Some competitive pilots fly in races around pre-defined courses. These gliding competitions test pilots' abilities to make best use of local weather conditions as well as their flying skills. Local and national competitions are organized in many countries, and there are biennial World Gliding Championships. Techniques to maximize a glider's speed around the day's task in a competition have been developed, including the optimum speed to fly, navigation using GPS and the carrying of water ballast. If the weather deteriorates pilots are sometimes unable to complete a cross-country flight. Consequently, they may need to land elsewhere, perhaps in a field, but motorglider pilots can avoid this by starting an engine. Powered-aircraft and winches are the two most common means of launching gliders. These and other launch methods require assistance and facilities such as airfields, tugs, and winches. These are usually provided by gliding clubs who also train new pilots and maintain high safety standards. Although in most countries the standards of safety of the pilots and the aircraft are the responsibility of governmental bodies, the clubs and sometimes national gliding associations often have delegated authority. ",
		link: "https://en.wikipedia.org/wiki/Gliding"
	},
	"hang-gliding": {
		description: "Hang gliding is an air sport or recreational activity in which a pilot flies a light, non-motorised foot-launched heavier-than-air aircraft called a hang glider. Most modern hang gliders are made of an aluminium alloy or composite frame covered with synthetic sailcloth to post a wing. Typically the pilot is in a harness suspended from the airframe, and controls the aircraft by shifting body weight in opposition to a control frame. Early hang gliders had a low lift-to-drag ratio, so pilots were restricted to gliding down small hills. By the 1980s this ratio significantly improved, and since then pilots can soar for hours, gain thousands of feet of altitude in thermal updrafts, perform aerobatics, and glide cross-country for hundreds of kilometres. The Fédération Aéronautique Internationale and national airspace governing organisations control some regulatory aspects of hang gliding. Obtaining the safety benefits of being instructed is highly recommended.",
		link: "https://en.wikipedia.org/wiki/Hang_gliding"
	},
	"paragliding": {
		description: "Paragliding is the recreational and competitive adventure sport of flying paragliders: lightweight, free-flying, foot-launched glider aircraft with no rigid primary structure. The pilot sits in a harness suspended below a fabric wing. Wing shape is maintained by the suspension lines, the pressure of air entering vents in the front of the wing, and the aerodynamic forces of the air flowing over the outside. Despite not using an engine, paraglider flights can last many hours and cover many hundreds of kilometers, though flights of one to two hours and covering some tens of kilometers are more the norm. By skillful exploitation of sources of lift, the pilot may gain height, often climbing to altitudes of a few thousand meters.",
		link: "https://en.wikipedia.org/wiki/Paragliding"
	},
	"speed-flying": {
		description: "Speed-flying (different from speed-riding) is the mix of skiing and paragliding. Speed flying and speed riding are very similar sports; speed flying is when the speed wing is foot-launched, while speed riding is a winter sport done on skis. Speed flying is a hybrid sport that has combined elements of paragliding, parachuting to create a new sport. Like paragliding, speed flying is done by launching from a slope with the wing overhead, already inflated by the incoming air. The main difference between speed flying and paragliding, is that speed flying is meant to create a fast, thrilling ride close to the slope, while the point of paragliding is usually to maintain a longer, gentler flight. The fast landing technique for speed wings is similar to that used in parachuting. However, parachuting or skydiving is done from a plane or fixed object (BASE jumping), and the wing is designed to arrest the free fall. Newer designs of hybrid-wings (also called mini-wings) are now being produced to allow a high speed \"hike and fly\" from mountainous areas. They can be soared in strong laminar winds and thermalled similar to paragliders, and may also be trimmed for a more traditional speed flying descent.",
		link: "https://en.wikipedia.org/wiki/Speed_flying"
	},
	"sky-diving": {
		description: "Skydiving, is a method of transiting from a high point to Earth with the aid of gravity, involving the control of speed during the descent with the use of a parachute/s. It may involve more or less free-falling which is a period when the parachute has not yet been deployed and the body gradually accelerates to terminal velocity. The first parachute jump in history was made by André-Jacques Garnerin, the inventor of the parachute, on October 22 1797. Garnerin tested his contraption by leaping from a hydrogen balloon 3,200 feet (980 m) above Paris. Garnerin's parachute bore little resemblance to today's parachutes, however, as it was not packed into any sort of container and did not feature a ripcord. The first intentional freefall jump with a ripcord-operated deployment was not made until over a century later by Leslie Irvin in 1919. While Georgia Broadwick made an earlier freefall in 1914 when her static line became entangled with her jump aircraft's tail assembly, her freefall descent was not planned. Broadwick cut her static line and deployed her parachute manually, only as a means of freeing herself from the aircraft to which she had become entangled. The military developed parachuting technology as a way to save aircrews from emergencies aboard balloons and aircraft in flight, and later as a way of delivering soldiers to the battlefield. Early competitions date back to the 1930s, and it became an international sport in 1952.",
		link: "https://en.wikipedia.org/wiki/Parachuting"
	},
	"wingsuit-flying": {
		description: "Wingsuit flying (or wingsuiting) is the sport of flying through the air using a wingsuit which adds surface area to the human body to enable a significant increase in lift. The modern wingsuit, first developed in the late 1990s, creates a surface area with fabric between the legs and under the arms. Wingsuits are sometimes referred to as \"birdman suits\" (after the makers of the first commercially available wingsuit), \"flying squirrel suits\" (due to their resemblance to the animal), and \"bat suits\" (due to their resemblance to the animal or perhaps the superhero). A wingsuit flight normally ends by deploying a parachute, and so a wingsuit can be safely flown from any point that provides sufficient altitude for flight and parachute deployment—normally a skydiving drop aircraft, or BASE-jump exit point such as a tall cliff or a safe mountain top. The wingsuit flier wears parachute equipment specially designed for skydiving or BASE jumping. While the parachute flight is normal, the canopy pilot typically unzips arm wings (after deployment) to be able to reach the steering parachute toggles and control the descent path. ",
		link: "https://en.wikipedia.org/wiki/Wingsuit_flying"
	}
};

function About(props) {
	let discipline = props.discipline;

	return (
		<div className='row bg-aviator'>
			<SideBar discipline={discipline}/>
			<div className='col-12 col-md-8 col-lg-9 post-form-area posts'>
				<div className='p-3 text-justify'>
					{disciplinesInfo[discipline].description}
				</div>
				<div className='mb-2 text-right'>
					This info is taken from <a className='text-link' href="https://en.wikipedia.org/wiki/Main_Page" target="_blank" rel='noopener noreferrer'>Wikipedia</a>!
					If you want to read more about {discipline}, <a className='text-link' href={disciplinesInfo[discipline].link} target="_blank">click here</a>!
				</div>
				<hr className='border border-light'/>
				{!sessionStorage.getItem('username') &&
					<div className='mb-2 text-right text-note'>
						In order to gain access to more functionality and see much more options you need to
						<Link className='text-link' to='/users/login'> login</Link> or
						<Link className='text-link' to='/users/register'> register</Link>!
					</div>
				}
			</div>
		</div>
	);
}

export default About;