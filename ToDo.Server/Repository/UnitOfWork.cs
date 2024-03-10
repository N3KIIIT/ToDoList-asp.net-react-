using ToDo.Server.AppDb;
using ToDo.Server.Repository.IRepository;

namespace ToDo.Server.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        public ITaskRepository Task { get;private set; }

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            Task = new TaskRepository(context);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
