import React, { useReducer } from "react";

// Initial JSON data
const initialState = [
  { id: 1, name: "Item 1", category: "A" },
  { id: 2, name: "Item 2", category: "B" },
  { id: 3, name: "Item 3", category: "A" },
  { id: 4, name: "Item 4", category: "C" }
];

// Actions
const ACTIONS = {
  SEARCH: "SEARCH",
  FILTER: "FILTER",
  SORT: "SORT",
  INSERT: "INSERT",
  UPDATE: "UPDATE",
  RETRIEVE: "RETRIEVE",
  DELETE: "DELETE"
};

// Reducer function
function jsonReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SEARCH:
      return state.filter(item =>
        item.name.toLowerCase().includes(action.payload.toLowerCase())
      );

    case ACTIONS.FILTER:
      return state.filter(item => item.category === action.payload);

    case ACTIONS.SORT:
      return [...state].sort((a, b) =>
        a[action.payload] > b[action.payload] ? 1 : -1
      );

    case ACTIONS.INSERT:
      return [...state, action.payload];

    case ACTIONS.UPDATE:
      return state.map(item =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );

    case ACTIONS.RETRIEVE:
      return initialState; // Reset to the initial state

    case ACTIONS.DELETE:
      return state.filter(item => item.id !== action.payload);

    default:
      return state;
  }
}

function Todo() {
  const [state, dispatch] = useReducer(jsonReducer, initialState);

  const handleSearch = (query) => {
    dispatch({ type: ACTIONS.SEARCH, payload: query });
  };

  const handleFilter = (category) => {
    dispatch({ type: ACTIONS.FILTER, payload: category });
  };

  const handleSort = (field) => {
    dispatch({ type: ACTIONS.SORT, payload: field });
  };

  const handleInsert = (item) => {
    dispatch({ type: ACTIONS.INSERT, payload: item });
  };

  const handleUpdate = (item) => {
    dispatch({ type: ACTIONS.UPDATE, payload: item });
  };

  const handleDelete = (id) => {
    dispatch({ type: ACTIONS.DELETE, payload: id });
  };

  const handleRetrieve = () => {
    dispatch({ type: ACTIONS.RETRIEVE });
  };

  return (
    <div>
      <h1>JSON Data Manipulation</h1>
      {/* Search */}
      <button onClick={() => handleSearch("Item 1")}>Search for "Item 1"</button>
      {/* Filter */}
      <button onClick={() => handleFilter("A")}>Filter by Category A</button>
      {/* Sort */}
      <button onClick={() => handleSort("name")}>Sort by Name</button>
      {/* Insert */}
      <button
        onClick={() =>
          handleInsert({ id: 5, name: "Item 5", category: "B" })
        }
      >
        Insert "Item 5"
      </button>
      {/* Update */}
      <button
        onClick={() =>
          handleUpdate({ id: 2, name: "Updated Item 2", category: "B" })
        }
      >
        Update Item 2
      </button>
      {/* Delete */}
      <button onClick={() => handleDelete(3)}>Delete Item 3</button>
      {/* Retrieve */}
      <button onClick={handleRetrieve}>Retrieve Original Data</button>

      <h2>Items:</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default Todo;
