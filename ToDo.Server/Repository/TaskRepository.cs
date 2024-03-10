using ToDo.Server.AppDb;
using ToDo.Server.AppDb.Entity;
using ToDo.Server.Repository.IRepository;

namespace ToDo.Server.Repository
{
    public class TaskRepository : Repository<TaskEntity>, ITaskRepository
    {
        private AppDbContext _context;
        public TaskRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task UpdateAsync(TaskEntity task)
        {
            _context.Update(task);
        }
    }
}
