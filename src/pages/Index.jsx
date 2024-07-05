import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription, ModalClose } from "@/components/ui/modal";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const queryClient = useQueryClient();

  const fetchTasks = async () => {
    // Fetch tasks from API or local storage
    return [];
  };

  const { data: tasksData, isLoading: isTasksLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const addTask = async (task) => {
    // Add task to API or local storage
    return task;
  };

  const { mutate: addTaskMutation } = useMutation(addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      toast("Task added successfully");
    },
  });

  const handleAddTask = (task) => {
    addTaskMutation(task);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="flex flex-col p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Inbox</h1>
      </header>
      <div className="flex-grow">
        {isTasksLoading ? (
          <p>Loading tasks...</p>
        ) : (
          <ul>
            {tasksData.map((task) => (
              <li key={task.id} className="flex items-center mb-2">
                <Checkbox id={`task-${task.id}`} />
                <Label htmlFor={`task-${task.id}`} className="ml-2">
                  {task.title}
                </Label>
                <Button variant="link" onClick={() => handleTaskClick(task)}>
                  Details
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-4">
        <Input placeholder="Add a new task" />
        <Button onClick={() => handleAddTask({ title: "New Task" })}>Add Task</Button>
      </div>
      {isModalOpen && selectedTask && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{selectedTask.title}</ModalTitle>
              <ModalDescription>{selectedTask.description}</ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <Button variant="outline" onClick={handleModalClose}>
                Close
              </Button>
              <Button>Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default Index;
