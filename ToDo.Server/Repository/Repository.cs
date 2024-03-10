using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using ToDo.Server.AppDb;
using ToDo.Server.Repository.IRepository;

namespace ToDo.Server.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly AppDbContext _context;
        internal DbSet<T> dbSet;
        public Repository(AppDbContext context) 
        {
            _context = context;
            dbSet = context.Set<T>(); 
        }

        public async Task AddAsync(T entity)
        {
           await _context.AddAsync(entity);
        }

        public async Task<T> GetAsync(Expression<Func<T, bool>> filter)
        {
            IQueryable<T> queryable = dbSet.Where(filter);
            return await queryable.FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await dbSet.ToListAsync();
        }

        public async Task RemoveAsync(T entity)
        {
            dbSet.Remove(entity);
        }

        public async Task RemoveRangeAsync(IEnumerable<T> entities)
        {
            dbSet.RemoveRange(entities); 
        }
    }
}
