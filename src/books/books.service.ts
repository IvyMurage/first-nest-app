import { Injectable, HttpException } from '@nestjs/common';
import { BOOKS } from 'src/mocks/books.mock';
import { CreateBookDTO } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  books = BOOKS;

  getBooks(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.books);
    });
  }

  getBook(bookID:string): Promise<any> {
    let id = Number(bookID);
    return new Promise((resolve) => {
      const book = this.books.find((book) => book.id === id);

      if (!book) {
        throw new HttpException('Book does not exist!', 404);
      }
      resolve(book);  
    });
  }

  async addBook(book: CreateBookDTO): Promise<CreateBookDTO> {
    const newBook: CreateBookDTO = {
      id: this.books.length + 1, 
      ...book,
    };
    this.books.push(newBook);
    return newBook; 
  }

  deleteBook(bookId): Promise<any> {
    const id = Number(bookId);
    return new Promise((resolve) => {
      const index = this.books.findIndex((book) => book.id === id);
      if (index === -1) throw new HttpException('Book does not exist!', 404);
      this.books.splice(index, 1);
    });
  }
}
