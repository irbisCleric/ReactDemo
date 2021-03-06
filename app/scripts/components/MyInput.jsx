import reactMixin from 'react-mixin';

export default class MyInput extends React.Component {
    changeValue (event) {
        this.setValue(event.currentTarget.value);
        if(this.props.change){
            this.props.change(event)
        }
    }

    render() {
        // Set a specific className based on the validation
        // state of this component. showRequired() is true
        // when the value is empty and the required prop is
        // passed to the input. showError() is true when the
        // value typed is invalid
        var className = this.showRequired() ? 'required' : this.showError() ? 'has-error' : null;

        // An error message is returned ONLY if the component is invalid
        // or the server has returned an error message
        var errorMessage = this.getErrorMessage();

        return (
            <div className={'form-group ' + className}>
                <input type="text"
                    onChange={this.changeValue.bind(this)}
                    value={this.getValue()}
                    name={this.props.name}
                    className='form-control'
                />
                <span>{errorMessage}</span>
            </div>
        );
    }
}

reactMixin.onClass(MyInput, Formsy.Mixin);