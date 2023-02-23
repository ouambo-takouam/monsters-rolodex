import { useState, useEffect } from 'react';
import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';
import './App.css';

function App() {
	const [searchField, setSearchField] = useState('');
	const [monsters, setMonsters] = useState([]);
	const [filteredMonsters, setFilteredMonsters] = useState(monsters);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((users) => setMonsters(users));
	}, []);

	useEffect(() => {
		setFilteredMonsters(
			monsters.filter((monster) =>
				monster.name.toLowerCase().includes(searchField.toLowerCase())
			)
		);
	}, [monsters, searchField]);

	const onSearchChange = (event) => {
		setSearchField(event.target.value);
	};

	return (
		<div className="App">
			<h1 className="app-title">Monsters Rolodex</h1>

			<SearchBox
				className="search-box"
				placeholder="Search monster"
				onChangeHandler={onSearchChange}
			/>

			<CardList monsters={filteredMonsters} />
		</div>
	);
}

export default App;
