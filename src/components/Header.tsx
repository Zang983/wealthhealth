import { Link } from "react-router-dom"
type Props = {
    linkTo:string
    textLink : string
}
function Header({linkTo,textLink}:Props) {
    return (
        <header>
            <h1>HRnet</h1>
            <p>
                <Link to={linkTo}>{textLink}</Link>
            </p>
        </header>
    )
}
export default Header