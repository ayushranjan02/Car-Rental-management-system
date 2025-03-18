using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRentalManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class created_table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentCars_Cars_CarssCarId",
                table: "RentCars");

            migrationBuilder.DropIndex(
                name: "IX_RentCars_CarssCarId",
                table: "RentCars");

            migrationBuilder.DropColumn(
                name: "CarssCarId",
                table: "RentCars");

            migrationBuilder.AddColumn<int>(
                name: "RentCarId",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_RentCars_CarId",
                table: "RentCars",
                column: "CarId");

            migrationBuilder.AddForeignKey(
                name: "FK_RentCars_Cars_CarId",
                table: "RentCars",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "CarId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentCars_Cars_CarId",
                table: "RentCars");

            migrationBuilder.DropIndex(
                name: "IX_RentCars_CarId",
                table: "RentCars");

            migrationBuilder.DropColumn(
                name: "RentCarId",
                table: "Cars");

            migrationBuilder.AddColumn<int>(
                name: "CarssCarId",
                table: "RentCars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_RentCars_CarssCarId",
                table: "RentCars",
                column: "CarssCarId");

            migrationBuilder.AddForeignKey(
                name: "FK_RentCars_Cars_CarssCarId",
                table: "RentCars",
                column: "CarssCarId",
                principalTable: "Cars",
                principalColumn: "CarId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
