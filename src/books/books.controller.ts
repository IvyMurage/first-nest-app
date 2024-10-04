import { Controller, Get, Post, Body, Delete, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-book.dto';
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async getBooks() {
    const books = await this.booksService.getBooks();
    return books;
  }

  @Get(':bookID')
  async getBook(@Param('bookID') bookID: string) {
    const book = await this.booksService.getBook(bookID);
    return book;
  }
  @Post()
  async addBooks(@Body() createBookDTO: CreateBookDTO) {
    const book = await this.booksService.addBook(createBookDTO)
    return book
  }

  @Delete()
  async deleteBook(@Query() query) {
    const books = await this.booksService.deleteBook(query.bookId)
    return books
  }
}
