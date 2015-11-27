
export default class User extends React.Component {
    render() {     
        return (
            <div>
                <h1>User Page  {this.props.params.id}</h1>
            </div>
        )
    }   
};
