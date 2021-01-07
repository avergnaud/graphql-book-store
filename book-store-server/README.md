# From

https://harshitpant.com/blog/making-a-graphql-api-in-express

updated for Apollo 2.0

# required

running mongodb

# queries

[http://localhost:4000/](http://localhost:4000/)

'''
mutation {
  postBook(title: "Harry Potter 1", price: 10, author: "Rowling"){
    _id,
    title,
    price,
    author
  }
}
'''

'''
{
  getAllBooks {
    _id,
    title,
    author,
    price
  }
}
'''