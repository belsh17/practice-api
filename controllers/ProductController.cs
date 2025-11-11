using System;
using Microsoft.AspNetCore.Mvc;
using ToDoApi.Models;

namespace ToDoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private static List<Product> Products = new List<Product>();

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(Products);
        }

        [HttpPost]
        public IActionResult AddProduct([FromBody] Product product)
        {
            product.Id = Products.Count + 1;
            Products.Add(product);
            return Ok(product);
        }

        [HttpPut("{id}")]
        public IActionResult EditProduct(int id,[FromBody] Product updatedProduct)
        {
            var existing = Products.FirstOrDefault(p => p.Id == id);
            if (existing == null) return NotFound();

            existing.ProductName = updatedProduct.ProductName;
            existing.Price = updatedProduct.Price;
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var existing = Products.FirstOrDefault(p => p.Id == id);
            if (existing == null) return NotFound();

            Products.Remove(existing);
            return Ok();
        }
    }
}