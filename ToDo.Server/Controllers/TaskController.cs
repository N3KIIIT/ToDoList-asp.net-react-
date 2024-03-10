using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;
using ToDo.Server.AppDb.Entity;
using ToDo.Server.Repository.IRepository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ToDo.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public TaskController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet]
        public async Task<IEnumerable<TaskEntity>> GetAll()
        {
            return await _unitOfWork.Task.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<TaskEntity> Get(Guid id)
        {
            return await _unitOfWork.Task.GetAsync(o => o.Id == id);
        }

        [HttpPost]
        public async Task Add([FromBody] TaskEntity entity)
        {
            entity.CreatedDate = DateTime.Now;
            await _unitOfWork.Task.AddAsync(entity);
            await _unitOfWork.SaveAsync();
        }

        [HttpPut("{id}")]
        public async Task Update(Guid id, [FromBody] TaskEntity entity)
        {
            entity.Id = id;
            await _unitOfWork.Task.UpdateAsync(entity);
            await _unitOfWork.SaveAsync();
        }
        [HttpDelete("{id}")]
        public async Task Delete(Guid id)
        {
            await _unitOfWork.Task.RemoveAsync(await _unitOfWork.Task.GetAsync(o => o.Id == id));
            await _unitOfWork.SaveAsync();
        }
    }
}
