using ToDo.Server.AppDb.Entity;

namespace ToDo.Server.Repository.IRepository
{
    public interface ITaskRepository : IRepository<TaskEntity>
    {
        Task UpdateAsync(TaskEntity task);
    }
}
