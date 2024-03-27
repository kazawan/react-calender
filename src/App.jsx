import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import isToday from 'dayjs/plugin/isToday';






const App = () => {
  // dayjs.extend(calendar)
  // dayjs.extend(isToday)
 

  const [currentMonth, setCurrentMonth] = useState(dayjs().month() + 1)
  const [currentYear, setCurrentYear] = useState(dayjs().year())
  const [currentDay, setCurrentDay] = useState(dayjs().date())
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY-MM-DD'))

  function getMonthDays(year, month) {
    return new Date(year, month, 0).getDate()
  }

  function getFirstDayWeek(year, month) {
    return new Date(year, month - 1, 1).getDay()
  }

  function nextMonth() {
    if (currentMonth === 12) {
      setCurrentMonth(1)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  function prevMonth() {
    if (currentMonth === 1) {
      setCurrentMonth(12)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  function initDate() {
    setCurrentYear(dayjs().year())
    setCurrentMonth(dayjs().month() + 1)
    setCurrentDay(dayjs().date())
    setCurrentDate(`${currentYear}-${currentMonth}-${currentDay}`)
  }


  useEffect(() => {
    initDate()
    

  }, [currentDate])



  const week = ['日', '一', '二', '三', '四', '五', '六']




  const weekList = week.map((day, index) => {
    return (
      <div key={index} className='text-center'>{day}</div>
    )
  })

  const handleDayClick = (date) => {
    console.log(date)
    setCurrentDate(date)
  }

  const [todoList, setTodoList] = useState([
    {
      id: 1,
      date: '2024-3-27',
      title: '吃飯',
      isDone: false
    },
    {
      id: 2,
      date: '2024-3-27',
      title: '睡覺',
      isDone: false
    },
    {
      id: 3,
      date: '2024-3-30',
      title: '打豆豆',
      isDone: false
    }
  ])



  const handleIsDone = (id) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isDone: !todo.isDone
        }
      } else {
        return todo
      }
    })
    setTodoList(newTodoList)


  }

  const handleAdd = (date, title) => {
    const newTodoList = [
      ...todoList,
      {
        id: todoList.length + 1,
        date: date,
        title: title ? title : '新增待辦事項',
        isDone: false
      }
    ]
    setTodoList(newTodoList)
  }





  const renderTodoList = useMemo(() => {
    const todos = []
    todoList.forEach((todo) => {
      if (todo.date === currentDate) {
        todos.push(
          <div key={todo.id} className='flex items-center justify-between'>
            <div>{todo.title}</div>
            <input type='checkbox' checked={todo.isDone} onChange={() => handleIsDone(todo.id)} />
          </div>

        )
      }
    })
    if (todos.length === 0) {
      return (
        <>
          <div>沒有待辦事項</div>

        </>


      )
    } else {
      return (
        todos

      )
    }

  }, [currentDate, currentMonth, currentYear, todoList])


 


  const dayList = useMemo(() => {
    return new Array(42).fill(0).map((d, index) => {
      const day = index - getFirstDayWeek(currentYear, currentMonth) + 1
      const isSelectDay = currentDate === `${currentYear}-${currentMonth}-${day}`

      const isCurrentMonth = day >= 1 && day <= getMonthDays(currentYear, currentMonth)
      const date = `${currentYear}-${currentMonth}-${day}`

      const numberofTodo = todoList.filter((todo) => todo.date === date).length
      // 显示上个月的日期
      if (day <= 0) {
        return (
          <div key={index} className='text-center text-gray-400'
          
          >{getMonthDays(currentYear, currentMonth - 1) + day}</div>
        )
      }
      // 显示下个月的日期
      if (day > getMonthDays(currentYear, currentMonth)) {
        return (
          <div key={index} className='text-center text-gray-400'>{day - getMonthDays(currentYear, currentMonth)}</div>
        )
      }

      return (
        <div key={index} className={
          `text-center 
       ${isSelectDay ? 'bg-blue-500 text-white' : ''}
       ${numberofTodo > 0 && numberofTodo <= 3 ? 'border-b-2  border-green-400' : ''}
       ${numberofTodo > 3 && numberofTodo <= 10 ? 'border-b-2  border-yellow-400' : ''}
        ${numberofTodo > 10 ? 'border-b-2  border-red-400' : ''
       }
        `
        }
          onClick={() => handleDayClick(date)}

        >{isCurrentMonth ? day : ''}

        </div>
      )
    }
    )
  }, [currentDate, currentMonth, currentYear, todoList])

  return (
    <>
      <div className='w-[210px] h-[210px]'>
        <div>{currentYear}-{currentMonth}-{currentDay}</div>
        <div className='w-[210px] h-[200px] bg-slate-300 text-black grid grid-cols-7 text-sm text-center  rounded-md p-2'>
          {weekList}
          {dayList}
        </div>
        <div className='
        [&_>button]:mr-2 
        [&_>button]:bg-blue-500
        [&_>button]:px-2
        [&_>button]:rounded-md  
        mt-2
        flex  justify-between
        '

        >
          <button onClick={() => prevMonth()}>上一月</button>
          <button onClick={() => nextMonth()}>下一月</button>
          <button onClick={() => initDate()}  >今天</button>
        </div>
      </div>

      <div className=' mt-20  bg-slate-300 text-black p-2 rounded-md'>
        <div>
          {currentDate}
          <button className='bg-blue-400 text-white px-2 rounded-md'
            onClick={() => handleAdd(currentDate, '完')} >ADD</button>
        </div>
        {renderTodoList}
      </div>
    </>
  )
}








export default App;