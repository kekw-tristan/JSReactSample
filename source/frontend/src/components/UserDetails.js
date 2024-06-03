const UserDetails = ({ user }) => {

    return (
        <div className="user-details">
            <h4>{user.username}</h4>
            <p><strong>Email: </strong>{user.email}</p>
            <p><strong>Passwort: </strong>{user.password}</p>
        </div>
    )
}

export default UserDetails