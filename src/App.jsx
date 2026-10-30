import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import TaskCounter from './components/TaskCounter'
import menuIcon from './assets/menu_icon.png'
import searchIcon from './assets/search_icon.png'
import checkIcon from './assets/check_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Call Mom', completed: false },
    { id: 2, text: 'Buy the new issue of Scientific American', completed: false },
    { id: 3, text: 'Return the textbook to Josie', completed: false },
    { id: 4, text: 'Buy the new album by Rake', completed: false },
    { id: 5, text: 'Buy a gift card for Dad', completed: false },
  ])
  const [filter, setFilter] = useState('all')
  const [nextId, setNextId] = useState(6)

  const addTask = (text) => {
    setTasks([...tasks, { id: nextId, text, completed: false }])
    setNextId(nextId + 1)
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <div className="app">
      <header>
        <img src={menuIcon} alt="Menu" />
        <div className="search-box">
          <img src={searchIcon} alt="Search" />
          <input type="text" placeholder="Quick find" />
        </div>
        <div className="task-count">
          <img src={checkIcon} alt="Check" />
          <TaskCounter total={tasks.length} completed={completedCount} />
        </div>
      </header>

      <nav>
        <ul>
          <li className="current">
            <img src={inboxIcon} alt="Inbox" />
            Inbox
            <span className="count">{tasks.length}</span>
          </li>
          <li>
            <img src={calendarIcon} alt="Today" />
            Today
            <span className="count">0</span>
          </li>
          <li>
            <img src={upcomingIcon} alt="Upcoming" />
            Upcoming
          </li>
        </ul>
      </nav>

      <main>
        <h1>Inbox</h1>
        <div className="filters">
          <button
            type="button"
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <span className="sep">|</span>
          <button
            type="button"
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <span className="sep">|</span>
          <button
            type="button"
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        <TaskForm onAddTask={addTask} />
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  )
}

export default App
