namespace ToDo.Server.Repository.IRepository
{
    public interface IUnitOfWork
    {
        ITaskRepository Task { get; }
        Task SaveAsync();
    }
}
