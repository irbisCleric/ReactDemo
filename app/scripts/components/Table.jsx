import $ from 'jQuery';
import { Link } from 'react-router';
export default class Table extends React.Component {
    constructor(props) {
        super(props);        
    }    
    componentWillUpdate() {
        console.log('Component will update');
    }
    componentDidUpdate() {
        // this.props.tableTitles = Object.keys(this.props.tableData[0]);     
    }
    render() {     
        return (
            <table className="medium-12 hover">
                    <thead>
                        <tr>  
                            {this.props.tableTitles.map((title, i) => {
                              return (                                                                
                                <th key={i}>{title}</th>                                                                             
                              );
                            })}
                        </tr>   
                    </thead>
                    <tbody>     
                        {this.props.tableData.map((user, i) => {
                          return (   
                           <tr key={i}>                                
                                <td key={i}>
                                    <Link to={"users/"+user.id}>{user.id}</Link>                               
                                </td>
                                <td key={i+'test'}>
                                <Link to={"users/"+user.id} params={{name:'test'}}>{user.name}</Link>                               
                                </td>                                
                            </tr>                                                
                          );
                        })}
                    </tbody> 
                </table>
        )
    }   
};
