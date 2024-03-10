using ToDo.Server.AppDb.Entity.Enum;

namespace ToDo.Server.AppDb.Entity
{
    public class TaskEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Today;
        public Priority Priority { get; set; } = Priority.Medium;
        public bool Status { get; set; } = false;
    }
}
