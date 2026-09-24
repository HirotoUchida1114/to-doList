import { useState, useEffect } from 'react';

export default function App() {
  // 初期状態はローカルストレージから読み込む
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todo_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [inputValue, setInputValue] = useState('');

  // タスクが更新されるたびにローカルストレージへ自動保存
  useEffect(() => {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // タスクの追加
  const handleAddTask = (e) => {
    e.preventDefault();
    // 空文字（空白のみ含む）の追加を防ぐ
    if (!inputValue.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      isCompleted: false,
    };

    // 元の配列を直接書き換えずに新しい配列を生成
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  // タスクの完了切り替え (doneの反転)
  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  // タスクの削除
  const handleDeleteTask = (id) => {
    // filterを使って指定したid以外の新しい配列を生成
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 text-slate-800">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 border border-slate-100">
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">
          React Task Manager
        </h1>

        {/* タスク入力フォーム */}
        <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="新しいタスクを入力..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            追加
          </button>
        </form>

        {/* タスク一覧表示 */}
        {tasks.length === 0 ? (
          <p className="text-center text-slate-400 py-4 text-sm">
            タスクはありません。新しいタスクを追加してください。
          </p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200/60 group hover:border-slate-300 transition"
              >
                <div
                  onClick={() => handleToggleComplete(task.id)}
                  className="flex items-center gap-3 flex-1 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    readOnly
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 pointer-events-none"
                  />
                  <span
                    className={`text-sm break-all transition-all duration-200 ${
                      task.isCompleted
                        ? 'line-through text-slate-400'
                        : 'text-slate-700'
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
                
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-slate-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition ml-2 md:opacity-0 group-hover:opacity-100"
                  aria-label="タスクを削除"
                >
                  <svg
                    xmlns="http://w3.org"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* タスクの残りカウント */}
        {tasks.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-xs text-slate-500">
            <span>総タスク数: {tasks.length}</span>
            <span>
              完了: {tasks.filter((t) => t.isCompleted).length} / 未完了:{' '}
              {tasks.filter((t) => !t.isCompleted).length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
