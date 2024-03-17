'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Checkbox } from './ui/checkbox';
const InputForm = () => {
  const [content, setContent] = useState('');
  const [todos, setTodos] = useState(new Array());
  useEffect(() => {
    axios.get('/api/todo').then(function (response) {
      //do not touch very important idk why
      setTodos(response.data.data);
      todos.push(response.data.data);
      console.log(todos);
    });
  }, []);
  const submit = () => {
    if (content !== '') {
      try {
        axios
          .post('/api/todo', {
            id: uuidv4(),
            content,
          })
          .then(function (response) {
            console.log(response.data.data);
            location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Content missing');
    }
  };
  return (
    <>
      <div className="grid items-center justify-center h-screen w-screen lg:grid-cols-12 md:grid-cols-8 sm:grid-cols-7 grid-cols-3 grid-rows-3 ">
        {todos.map((data) => {
          console.log(data)
          return (
            <div
              className="ml-2 bg-gray-400 rounded-md grid justify-center "
              key={data.id}
            >
              <span className="text-center font-bold">{data.content}</span>
              
              <span className=''>
                Is it done{'  '}
                <Checkbox
                  onClick={() => {
                    console.log("tospa")
                    axios.post('/api/todo/update', {
                      id: data.id,
                      isChecked: data.done
                    });
                    location.reload()
                  }}
                  
                  checked={data.done}
                />
              </span>

              <Button
                onClick={() => {
                  axios.post('/api/todo/delete', {
                    id: data.id,
                  });
                  location.reload();
                }}
                className="ml-3 w-14 h-7 bg-rose-600 mb-1"
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-2 left-2 ">
        <Input
          placeholder="Todo"
          className=""
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button className="mt-2" onClick={submit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default InputForm;
