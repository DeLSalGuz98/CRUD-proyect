import React from 'react';

class CardTask extends React.Component{
    constructor(props){
        super(props);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }
    handleClickEdit(){
        this.props.handleClickEditProp();
    }
    handleClickDelete(){
        this.props.handleClickDeleteProp();
    }
    render(){
        return(
            <div className="card_task">
                <div className="title_container">
                    <p className="title_task">{this.props.TitleTask}:</p>      
                </div>
                <div className="description_container"> 
                    <div className="description">
                        <p className="description_task">
                            {this.props.DescriptionTask}
                        </p>
                    </div>
                </div>
                <div className="button_container">
                    <div className="buttons">
                        <button className="edit" onClick={this.handleClickEdit}>Edit</button>
                        <button className="delete" onClick={this.handleClickDelete}>Delete</button>
                    </div>                       
                </div>
            </div>
        );
    }
}


class Crud extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            valueNameTask: '',
            valueDescriptionTask: "",
            task: [],
            idToUpdate:'',
            editTask: false,
            buttonName: 'Send'
        }
        this.handleChangeNameTask = this.handleChangeNameTask.bind(this);
        this.handleChangeDescriptionTask = this.handleChangeDescriptionTask.bind(this);
        this.handleClickSend = this.handleClickSend.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
    }
    handleChangeNameTask(e){
        this.setState({
            valueNameTask: e.target.value
        });
    }
    handleChangeDescriptionTask(e){
        this.setState({
            valueDescriptionTask: e.target.value
        });
    }
    handleClickSend(e){
        let nameTask = this.state.valueNameTask;
        let descriptionTask = this.state.valueDescriptionTask;

        if(this.state.editTask === true){
            let id = this.state.idToUpdate;
            console.log(`el usuario ha acutalizado la tarea: ${id}, ${nameTask}, ${descriptionTask}`);
            this.UpdateTask(id, nameTask, descriptionTask);
            
        }else{            
            this.addNewTask(nameTask,descriptionTask);
            this.setState({
                valueNameTask: '',
                valueDescriptionTask: ''
            });
        }
        e.preventDefault();                
    }
    addNewTask(nameTask, descriptionTask){
        fetch('/api/task', {
            method: 'POST',
            body: JSON.stringify({
                name_task: nameTask , 
                description_task: descriptionTask
            }),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then( () => {
            this.getAllTasks();
        })
        .catch(err => console.log(err));
    }
    componentDidMount(){
        this.getAllTasks();
    }
    getAllTasks(){
        fetch('/api/task',)
        .then(res => res.json())
        .then((data) => {
            this.setState({
                task: data
            });
        })
        .catch(data => console.log(data));
    }
    handleClickDelete(id){
        const message = 'You are deleting this task, are you sure ?';
        if(confirm(message)){
            this.DeleteTask(id);
            alert('OK. This task was delete');
        }        
    }
    DeleteTask(id){
        fetch(`/api/task/${id}`, {
            method: 'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(()=>{
            this.getAllTasks();
        })
        .catch(err => console.log(err));
    }
    handleClickEdit(id, name, description){
        this.setState({
            valueNameTask: name,
            valueDescriptionTask: description,
            editTask: true,
            buttonName: 'Update',
            idToUpdate: id
        });

    }
    UpdateTask(id, name, description){
        fetch(`/api/task/${id}`,{
            method: 'PUT',
            body: JSON.stringify({
                name_task: name , 
                description_task: description
            }),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                editTask: false,
                buttonName: 'Send',
                idToUpdate: '',
                valueNameTask: '',
                valueDescriptionTask: ''
            });
            this.getAllTasks();
        })
        .catch(err => console.log(err));
    }
    
    render(){
        return(
            <div className="container" style={this.props.style}>
                <section className="input_container">
                    <div className="input_task">
                        <form onSubmit={this.addNewTask}>
                            <div className="task_name_container">
                                <input className="task_name" name="Title" type="text" placeholder="Task" onChange={this.handleChangeNameTask} value={this.state.valueNameTask}/>
                            </div>
                            <div className="task_description_container">
                                <textarea className="task_description" name="Description" id="" rows="4" placeholder="Write a description" wrap="soft"
                                onChange={this.handleChangeDescriptionTask} value={this.state.valueDescriptionTask}></textarea>
                            </div>
                            <div className="task_button_container">
                                <button type="submit" onClick={this.handleClickSend} >{this.state.buttonName}</button>
                            </div>
                        </form>                        
                    </div>
                </section>
                <section className="task_container">
                    <div className="task_section">
                        <h3>All Tasks</h3>
                    </div>
                    <div className="card_tasks_cotainer">
                        {
                            this.state.task.map(task =>{
                                return(
                                    <CardTask key={task.id} TitleTask={task.name_task} DescriptionTask={task.description_task}
                                        handleClickDeleteProp={()=>{this.handleClickDelete(task.id)}} 
                                        handleClickEditProp={()=>{this.handleClickEdit(task.id, task.name_task, task.description_task)}} 
                                    />
                                )
                            })
                        }                                                
                    </div>
                </section>
            </div>
        );
    }
}

export default Crud;