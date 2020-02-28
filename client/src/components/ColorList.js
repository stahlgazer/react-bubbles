import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }, props) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`colors/${colorToEdit.id}`, colorToEdit)
      .then(response => {
        console.log("edited", response.data);
        // return a new array with updated color and other colors
        var newColors = [];
        for (let i = 0; i < colors.length; i++) {
          if (colors[i].id === colorToEdit.id) {
            newColors = [...newColors, colorToEdit];
          } else {
            newColors = [...newColors, colors[i]];
          }
        }
        updateColors(newColors);
      })
      .catch(error => {
        console.log("editing error", error);
      });
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`colors/${color.id}`)
      .then(response => {
        // delete color and show updated colors that weren't deleted
        console.log("Just deleted", response);
        var newColors = colors.filter(item => item.id !== color.id);
        updateColors(newColors);
      })
      .catch(error => {
        console.log("error deleting", error);
      });
  };

  const addingColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("colors", addColor)
      .then(response => {
        console.log("Just added", response);
        var newColors = [...colors, addColor];
        updateColors(newColors);
        document.getElementById('add-color').reset();
      })
      .catch(error => {
        console.log("error adding color", error);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer">
        {/* stretch - build another form here to add a color */}
        <form id="add-color" onSubmit={addingColor}>
          <h2>Add New Color</h2>
          <label>color name: </label>
          <input
            required
            placeholder="Cherry"
            type="text"
            onChange={e => setAddColor({ ...addColor, color: e.target.value })}
          />
          <label>hex code: </label>
          <input
            required="true"
            placeholder="#C30032"
            type="text"
            onChange={e =>
              setAddColor({
                ...addColor,
                code: { hex: e.target.value }
              })
            }
          />
          <button>Add Color</button>
        </form>
      </div>
    </div>
  );
};

export default ColorList;
