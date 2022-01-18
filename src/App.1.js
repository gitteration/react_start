import logo from './logo.svg';
import './App.1.css';
import React from 'react';
function App() {
	const add_contents = 'react Hello3';
	function clickEvent(){
		alert(11)
	}
	class Toggle extends React.Component{
		constructor(props){
			super(props);
			this.state = {isToggleOn : true};

			this.handleClick = this.handleClick.bind(this);
		}

		handleClick() {
			this.setState(prevState =>({
				isToggleOn: !prevState.isToggleOn
			}));
		}

		render() {
			return (
				<button onClick={this.handleClick}>
					{this.state.isToggleOn ? 'ON' : 'OFF'}
				</button>
			)
		}
	}

	/*
		7. 조건부 렌더링 START
	*/
	
	function UserGreeting(props){
		return <h1>Wekcome back!</h1>;
	}

	function GuestGreeting(props){
		return <h1>Please sign up</h1>;
	}

	function Greeting(props){
		const isLoggedIn = props.isLoggedIn;
		if(isLoggedIn){
			return <UserGreeting />;
		}
		return <GuestGreeting />;
	}

	function LoginButton(props){
		return (
			<button onClick={props.onClick}>
				Login
			</button>
		);
	}
	function LogoutButton(props){
		return (
			<button onClick={props.onClick}>
				Logout
			</button>
		);
	}

	class LoginControl extends React.Component {
		constructor(props){
			super(props);
			this.handleLoginClick = this.handleLoginClick.bind(this);
			this.handleLogoutClick = this.handleLogoutClick.bind(this);
			this.state = {
				isLoggedIn: false
			}
		}
		handleLoginClick(){
			this.setState({
				isLoggedIn:true
			});
		}
		handleLogoutClick(){
			this.setState({
				isLoggedIn:false
			});
		}
		
		render() {
			const isLoggedIn = this.state.isLoggedIn;
			let button;
			let expression_logical_operator = isLoggedIn && '논리 && 연산자를 이용하여 표현 할 수 있다. &&의 앞에 조건이 true이면 뒤에 있는 엘리먼트가 출력된다.'; 
			let expression_trinomial_operator = isLoggedIn ? '삼항연산자도 사용 가능' : '';
			if(isLoggedIn){
				button = <LogoutButton onClick={this.handleLogoutClick} />
			}else{
				button = <LoginButton onClick={this.handleLoginClick} />
			}
			
			return (
				<div>
					<Greeting isLoggedIn={isLoggedIn } />
					{button}<br/>
					{expression_logical_operator}<br/>
					{expression_trinomial_operator}
				</div>
			)
		}

	}

	// 렌더링 막기 - null을 반환하여 막을 수 있다.
	
	function WarningBanner(props){
		if(props.warn){
			return null;
		}

		return (
			<div className ="warning">
				Warning!
			</div>
		);
	}

	class Page extends React.Component{
		constructor(props){
			super(props);
			this.state = {showWarning : true};
			this.handleToggleClick = this.handleToggleClick.bind(this);
		}

		handleToggleClick(){
			this.setState(state => ({
				showWarning : !state.showWarning
			}));
		}
		
		render() {
			return (
				<div>
					<WarningBanner warn = {this.state.showWarning } />
					<button onClick={this.handleToggleClick}>
						{this.state.showWarning ? 'Hide' : 'Show'}
					</button>
				</div>
			);
		}
	}
	

	/*
		7. 조건부 렌더링 END
	*/

	/*
		8. 리스트와 Key START
		
		- 리스트의 각 항목 속성에 key를 넣어야 하며 생략할 경우 경고문이 뜬다. 
		  key는 react에서 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕는데 이 때 key 속성에 고유한 값을 부여하여 지정해야한다.
		  만약 고유한 값이 없다면 최후의 수단으로 해당 항목의 index를 key로 사용할 수 있다.
		  key는 배열 안에서 형제 사이에서 고유해야 하고 전체 범위에서 고유할 필요는 없다.
		  key 속성은 클라이언트에 노출되지 않는다.

	*/ 

	const number = [1,2,3,4,5];
	function ListItem(props){
		return <li>{props.value}</li>
	}

	function NumberList(props){
		const numbers = props.numbers;
		const listItems = numbers.map((number) => 
			<ListItem key = {number.toString()} value = {number * 2}/>
		);
		return (
			<ul>
				{listItems}
			</ul>
		);
	}

	const posts = [
		{id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
 	 	{id: 2, title: 'Installation', content: 'You can install React from npm.'}
	]

	function Blog(props){
		const sidebar = (
			<ul>
				{props.posts.map((post) => 
					<li key={post.id}>
						{post.title}
					</li>
				)}
			</ul>
		);
		
		const content = props.posts.map((post) => 
			<div key = {post.id} id = {post.id}>
				<h3>
					{post.title}
				</h3>
				<p>
					{post.content}
				</p>
			</div>
		);
		
		return (
			<div>
				{sidebar}
				<hr />
				{content}
			</div>
		)
	}
	/*
		8. 리스트와 Key END
	*/

	/*
		9. 폼 START
		- 여기서 form, input, textarea, select 태그를 어떻게 사용하는지 알아보겠다.
	
	*/
	class NameForm extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				input_value : '',
				textarea_value : '',
				select_value : 'coconut',
			};
			this.handleInputChange = this.handleInputChange.bind(this);
			this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
			this.handleSelectChange = this.handleSelectChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
		}

		handleInputChange(event){
			this.setState({
				input_value : event.target.value
			});
		}
		handleTextAreaChange(event){
			this.setState({
				textarea_value : event.target.value
			})
		}
		
		handleSelectChange(event){
			this.setState({
				select_value : event.target.value
			})
		}
		handleSubmit(event){
			const contents = 
			`
				A name was submitted :  ${this.state.input_value}         
				A n essay was submitted : ${this.state.textarea_value}
				Your Select favorite flavor is : ${this.state.select_value}
			`
			alert(
				contents	
			);
			event.preventDefault();
		}

		render() {
			return (
				<form onSubmit={this.handleSubmit}>
					<label>
						name :
						<input type="text" value={this.state.input_value} onChange={this.handleInputChange}/>
						<br /><br />
						essay :
						<textarea value={this.state.textarea_value} onChange={this.handleTextAreaChange}/>
						<br /><br />
						<select value={this.state.select_value} onChange={this.handleSelectChange}>
							<option value="grapefruit">Grapefruit</option>
							<option value="lime">Lime</option>
							<option value="coconut">Coconut</option>
							<option value="mango">Mango</option>
						</select>

					</label>
					<br /><br />
					<input type="submit" value="Submit"/>
				</form>
			)
		};
	}
	/*
		9. 폼 END
	*/

	/** / 
	 * 10. State 끌어올리기 START
	 * - 동일한 데이터에 대한 변경사항을 여러 컴포넌트에 반영해야 할 필요가 있는데 이 때 공통 조상으로 state를 끌어올려 반영하는 방법을 알아보겠다.
	 */
	function BoilingVerdict(props){
		if(props.celsius >= 100){
			return <p>The water would boil.</p>;
		}
		return <p>The water would not boil</p>;
	}

	class Calculator extends React.Component{
		constructor(props){
			super(props);
			this.state = {temperature : ''};
			this.handleChange = this.handleChange.bind(this); 
		}
		handleChange(event){
			this.setState({temperature : event.target.value})
		}
		render(){
			const temperature = this.state.temperature;
			return (
				<fieldset>
					<legend>Enter temperature in Celsius:</legend>
					<input value={temperature} onChange={this.handleChange}/>
					<BoilingVerdict celsius={parseFloat(temperature)} />
				</fieldset>
			)
		}
	}




	/**
	 * 10. State 끌어올리기 END
	 */

	return (
		<div className="App1">
			<header className="App-header">
				<h1>react Hello2 {add_contents}</h1>
			</header>
			<button onClick={clickEvent}>
				버튼
			</button>
			<Toggle />
			<LoginControl />
			<Page />
			<NumberList numbers={number} />
			<Blog posts={posts}/>
			<NameForm />
			<Calculator />
		</div>
	);
}

export default App;
