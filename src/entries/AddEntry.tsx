import { NavLink } from "react-router";

function AddEntry() {
	return <>
		<p>Add entry</p>
		<nav>
    		<NavLink to="/entries" end>Back</NavLink>
      	</nav>
	</>
}

export default AddEntry;