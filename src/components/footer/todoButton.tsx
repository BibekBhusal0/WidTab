import { FaListCheck } from "react-icons/fa6";
import { Box, Button, IconButton, Popover } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import Todo from "@/layout/widgets/todo";
import { changeCurrentSpace } from "@/redux/slice/layout";

function TodoButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleOpen} aria-label="settings">
        <FaListCheck />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        marginThreshold={30}
        open={open}
        onClose={handleClose}>
        <TodoPopover />
      </Popover>
    </>
  );
}

function TodoPopover() {
  const dispatch = useDispatch();
  const { Tasks, pinnedTodo } = useSelector((state: StateType) => state.todo);
  const pinned = Tasks.find((t) => t.id === pinnedTodo);

  return (
    <div className="flex h-56 overflow-clip">
      {pinned && (
        <Box
          sx={{ borderRight: "1px solid" }}
          className="w-56"
          //
        >
          <Todo {...pinned} showControls={false} />
        </Box>
      )}
      <div className="flex-center flex-col px-3">
        <Button
          variant="contained"
          onClick={() =>
            dispatch(changeCurrentSpace({ type: "static", id: "todo" }))
          }>
          All To-dos
        </Button>
      </div>
    </div>
  );
}

export default TodoButton;
