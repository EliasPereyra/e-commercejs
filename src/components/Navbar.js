import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="hero">
      <Link to="/">
        <h1>E-CommerceJS</h1>
      </Link>
      <ul>
        <li>
          About
        </li>
        <li>
          Contact
        </li>
      </ul>
    </div>
  )
}

export default Hero
